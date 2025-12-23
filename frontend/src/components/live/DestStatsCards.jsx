import { Card, Col, Row, Typography } from "antd";
import {
    WarningOutlined,
    FieldTimeOutlined,
    StopOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export default function DestStatsCards({ data }) {
    return (
        <Row gutter={[16, 16]}>
            {data.map((item) => (
                <Col key={item.dest} xs={24} sm={12} md={8} lg={4}>
                    {" "}
                    {/* 5 cols on lg */}
                    <Card
                        style={{
                            borderColor: "#ff4d4f",
                            backgroundColor: "#1f1f1f", // Dark theme background for card
                            color: "white",
                        }}
                        bodyStyle={{ padding: "12px" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 12,
                            }}
                        >
                            <Title
                                level={4}
                                style={{ color: "white", margin: 0 }}
                            >
                                {item.dest}
                            </Title>
                            <WarningOutlined
                                style={{ color: "#ff4d4f", fontSize: "18px" }}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 8,
                            }}
                        >
                            <Text style={{ color: "#a6a6a6" }}>
                                <StopOutlined /> Holding
                            </Text>
                            <Text strong style={{ color: "white" }}>
                                {item.holding_count}
                            </Text>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#a6a6a6" }}>
                                <FieldTimeOutlined /> NAS Delay
                            </Text>
                            <Text
                                strong
                                style={{ color: "#e6f7ff", fontSize: "16px" }}
                            >
                                {item.avg_nas_delay}m
                            </Text>
                        </div>

                        {/* Progress bar simulation */}
                        <div
                            style={{
                                marginTop: 12,
                                height: 4,
                                background: "#434343",
                                borderRadius: 2,
                            }}
                        >
                            <div
                                style={{
                                    width: `${Math.min(
                                        item.avg_nas_delay,
                                        100
                                    )}%`,
                                    height: "100%",
                                    background: "#ff4d4f",
                                    borderRadius: 2,
                                }}
                            ></div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
