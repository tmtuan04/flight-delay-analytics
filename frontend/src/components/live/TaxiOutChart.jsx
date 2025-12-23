import { Card, Select } from "antd";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function TaxiOutChart({ data, currentAirport, onFilterChange }) {
    return (
        <Card
            title={`Origin Taxi-Out History: ${currentAirport}`}
            extra={
                <Select
                    defaultValue={currentAirport}
                    onChange={onFilterChange}
                    style={{ width: 120 }}
                    options={[
                        { value: "JFK", label: "JFK" },
                        { value: "LAX", label: "LAX" },
                        { value: "ATL", label: "ATL" },
                        { value: "ORD", label: "ORD" },
                    ]}
                />
            }
            style={{ marginTop: 24 }}
        >
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <CartesianGrid
                        stroke="#f5f5f5"
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="window_start"
                        tickFormatter={(t) => dayjs(t).format("HH:mm")}
                        stroke="#8c8c8c"
                    />

                    {/* Trục trái: Avg Taxi Out (Minutes) */}
                    <YAxis
                        yAxisId="left"
                        label={{
                            value: "Minutes",
                            angle: -90,
                            position: "insideLeft",
                        }}
                        stroke="#1890ff"
                    />

                    {/* Trục phải: Total Departures */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{
                            value: "Flights",
                            angle: 90,
                            position: "insideRight",
                        }}
                        stroke="#52c41a"
                    />

                    <Tooltip
                        labelFormatter={(t) =>
                            dayjs(t).format("YYYY-MM-DD HH:mm:ss")
                        }
                        contentStyle={{
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 8,
                        }}
                    />
                    <Legend />

                    {/* Đường Taxi Out - Màu Xanh Dương */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="avg_taxi_out"
                        name="Avg Taxi Out (Min)"
                        stroke="#1890ff"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                    {/* Đường Departures - Màu Xanh Lá (Dạng nét đứt hoặc Area mờ) */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="total_departures"
                        name="Total Departures"
                        stroke="#52c41a"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </Card>
    );
}
