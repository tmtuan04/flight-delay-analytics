import { db } from "../utils/drizzle";
import { originAirportDailyStatsTable } from "../schemas/origin_airport_daily_stats";
import { destinationAirportDailyStatsTable } from "../schemas/destination_airport_daily_stats";
import { airportsTable } from "../schemas/airports";
import { sql, eq, and, gte, lte } from "drizzle-orm";

export async function getAirportStats({ dateRange, airports } = {}) {
    const conditionsOrigin = [];
    const conditionsDest = [];

    // Đảm bảo lọc dữ liệu ngay từ Subquery để tối ưu hiệu năng
    if (dateRange?.from) {
        const fromDate = dateRange.from; // Chuỗi "YYYY-MM-DD"
        conditionsOrigin.push(gte(originAirportDailyStatsTable.flightDate, fromDate));
        conditionsDest.push(gte(destinationAirportDailyStatsTable.flightDate, fromDate));
    }
    
    if (dateRange?.to) {
        const toDate = dateRange.to; // Chuỗi "YYYY-MM-DD"
        conditionsOrigin.push(lte(originAirportDailyStatsTable.flightDate, toDate));
        conditionsDest.push(lte(destinationAirportDailyStatsTable.flightDate, toDate));
    }

    const originStats = db
        .select({
            code: originAirportDailyStatsTable.origin,
            totalDepartures: sql`SUM(${originAirportDailyStatsTable.totalFlights})`
                .mapWith(Number)
                .as("totalDepartures"),
            delayedDep: sql`SUM(${originAirportDailyStatsTable.delayedFlights})`
                .mapWith(Number)
                .as("delayedDep"),
            cancelledDep: sql`SUM(${originAirportDailyStatsTable.cancelledFlights})`
                .mapWith(Number)
                .as("cancelledDep"),
            totalDepDelay: sql`SUM(${originAirportDailyStatsTable.allDelayTotalMinutes})`
                .mapWith(Number)
                .as("totalDepDelay"),
        })
        .from(originAirportDailyStatsTable)
        .where(
            conditionsOrigin.length
                ? sql.join(conditionsOrigin, sql` AND `)
                : undefined
        )
        .groupBy(originAirportDailyStatsTable.origin)
        .as("os");

    const destStats = db
        .select({
            code: destinationAirportDailyStatsTable.dest,
            totalArrivals: sql`SUM(${destinationAirportDailyStatsTable.totalFlights})`
                .mapWith(Number)
                .as("totalArrivals"),
            totalArrDelay: sql`SUM(${destinationAirportDailyStatsTable.allDelayTotalMinutes})`
                .mapWith(Number)
                .as("totalArrDelay"),
            delayedArr: sql`SUM(${destinationAirportDailyStatsTable.delayedFlights})`
                .mapWith(Number)
                .as("delayedArr"),
        })
        .from(destinationAirportDailyStatsTable)
        .where(
            conditionsDest.length
                ? sql.join(conditionsDest, sql` AND `)
                : undefined
        )
        .groupBy(destinationAirportDailyStatsTable.dest)
        .as("ds");

    // Truy vấn chính kết hợp dữ liệu
    return await db
        .select({
            airportCode: airportsTable.airportCode,
            airportName: airportsTable.airportName,
            city: airportsTable.cityName,
            totalDepartures: sql`COALESCE(${originStats.totalDepartures}, 0)`.mapWith(Number),
            totalArrivals: sql`COALESCE(${destStats.totalArrivals}, 0)`.mapWith(Number),
            delayedDep: sql`COALESCE(${originStats.delayedDep}, 0)`.mapWith(Number),
            avgDepDelay: sql`COALESCE(${originStats.totalDepDelay} / NULLIF(${originStats.delayedDep}, 0), 0)`.mapWith(Number),
            avgArrDelay: sql`COALESCE(${destStats.totalArrDelay} / NULLIF(${destStats.delayedArr}, 0), 0)`.mapWith(Number),
        })
        .from(airportsTable)
        .leftJoin(originStats, eq(airportsTable.airportCode, originStats.code))
        .leftJoin(destStats, eq(airportsTable.airportCode, destStats.code))
        .where(
            and(
                // Chỉ lấy các sân bay có dữ liệu trong khoảng thời gian đã lọc
                sql`(${originStats.totalDepartures} > 0 OR ${destStats.totalArrivals} > 0)`,
                airports?.length ? sql`${airportsTable.airportCode} IN (${sql.join(airports, sql`,`)})` : undefined
            )
        )
        .orderBy(sql`${originStats.totalDepartures} DESC`);
}