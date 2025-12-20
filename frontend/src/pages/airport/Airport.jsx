"use client";

import { useEffect, useState, useMemo } from "react";
import { Typography, Spin, Row, Col, Card } from "antd";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

import FilterBar from "../../common/FilterBar";
import Loading from "../../common/Loading";
import AirportPerformanceTable from "../../components/airport/AirportPerformanceTable";
import TopOriginCharts from "../../components/airport/TopOriginCharts";
import AirportScatterGroup from "../../components/airport/AirportScatterGroup";

import { getAirportStats } from "../../api/airport";

const { Text } = Typography;

export default function AirportAnalysisTab() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const range = useMemo(() => {
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        if (!from || !to) return null;
        return { from: dayjs(from), to: dayjs(to) };
    }, [searchParams]);

    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            setLoading(true);
            try {
                const dateRangeParam = range
                    ? {
                        from: range.from.format("YYYY-MM-DD"),
                        to: range.to.format("YYYY-MM-DD"),
                    } : null;

                const result = await getAirportStats({
                    dateRange: dateRangeParam,
                });
                if (!ignore) setData(result);
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        fetchData();
        return () => {
            ignore = true;
        };
    }, [range]);

    if (loading) return <Loading />;

    return (
        <Spin spinning={loading}>
            {/* <FilterBar enabledFilters={["dateRange"]}/>

            {range && (
                <div style={{ marginTop: 8 }}>
                    <Text type="secondary" italic>
                        Data from{" "}
                        <b>{dayjs(range.from).format("DD/MM/YYYY")}</b> to{" "}
                        <b>{dayjs(range.to).format("DD/MM/YYYY")}</b>
                    </Text>
                </div>
            )} */}

            <div className="mt-6">
                {/* Row 1: Top 5 Charts */}
                <TopOriginCharts data={data}/>

                {/* Row 2: Scatter Plot (Tương quan mật độ & trễ) */}
                <AirportScatterGroup data={data} />

                {/* Row 3: Table chi tiết */}
                <div className="mt-6">
                    <Card title="Detailed Airport Statistics">
                        <AirportPerformanceTable data={data} />
                    </Card>
                </div>
            </div>
        </Spin>
    );
}
