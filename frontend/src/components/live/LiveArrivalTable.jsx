import { Table, Tag, Progress, Typography, Card } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function LiveArrivalTable({ data }) {
    const columns = [
        {
            title: "FLIGHT",
            dataIndex: "flight_code",
            key: "flight",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "DEP TIME",
            dataIndex: "dep_time",
            key: "dep_time",
            render: (t) => dayjs(t).format("HH:mm:ss A"),
        },
        {
            title: "ROUTE",
            key: "route",
            render: (_, r) => (
                <span>
                    <Text strong>{r.origin}</Text>
                    <span style={{ margin: "0 8px", color: "#bfbfbf" }}>
                        &gt;
                    </span>
                    <Text strong style={{ color: "#1890ff" }}>
                        {r.dest}
                    </Text>
                </span>
            ),
        },
        {
            title: "ML PREDICTION",
            dataIndex: "prediction",
            key: "prediction",
            render: (status) => {
                let color = "default";
                if (status === "ON_TIME") color = "success";
                if (status === "DELAYED") color = "warning";
                if (status === "CANCELLED") color = "error";

                return (
                    <Tag
                        color={color}
                        style={{
                            minWidth: 80,
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "CONFIDENCE",
            dataIndex: "confidence",
            key: "confidence",
            width: 300,
            render: (val) => {
                const percent = Math.round(val * 100);
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Progress
                            percent={percent}
                            steps={10}
                            strokeColor={
                                percent > 80
                                    ? "#1890ff"
                                    : percent > 50
                                    ? "#faad14"
                                    : "#ff4d4f"
                            }
                            showInfo={false}
                            size="small"
                            style={{ flex: 1 }}
                        />
                        <Text type="secondary" style={{ width: 40 }}>
                            {percent}%
                        </Text>
                    </div>
                );
            },
        },
    ];

    return (
        <Card
            title="Live Arrival Board & ML Prediction"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: 0 }}
        >
            <Table
                dataSource={data}
                columns={columns}
                rowKey="flight_code"
                pagination={false}
                size="middle"
            />
        </Card>
    );
}
