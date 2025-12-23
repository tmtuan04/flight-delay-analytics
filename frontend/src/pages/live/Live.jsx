// import { useEffect, useState } from "react";
// import { Spin } from "antd";
// import { ReloadOutlined } from "@ant-design/icons";
// import { getLiveDashboardData } from "../../api/live";

// import DestStatsCards from "../../components/live/DestStatsCards";
import TaxiOutChart from "../../components/live/TaxiOutChart";
import LiveArrivalTable from "../../components/live/LiveArrivalTable";
// import { getLiveDashboardData as getLiveDemo } from "../../api/astra";

export default function LiveAnalysisTab() {
    // const [loading, setLoading] = useState(true);
    // const [data, setData] = useState({
    //     destStats: [],
    //     taxiOutHistory: [],
    //     liveBoard: [],
    // });
    // const [originFilter, setOriginFilter] = useState("JFK");

    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const result = await getLiveDashboardData(originFilter);
    //         setData(result);
    //     } catch (error) {
    //         console.error("Failed to fetch live data", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // Initial Fetch
    // useEffect(() => {
    //     fetchData();

    //     // Optional: Auto refresh every 10 seconds for "Live" feel
    //     const interval = setInterval(fetchData, 10000);
    //     return () => clearInterval(interval);
    // }, [originFilter]);

    // const handleFilterChange = (val) => {
    //     setOriginFilter(val);
    // };

    return (
        <>
            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#1890ff",
                        cursor: "pointer",
                    }}
                    onClick={fetchData}
                >
                    <ReloadOutlined spin={loading} />
                    <span>Refresh</span>
                </div>
            </div> */}

            {/* <Spin spinning={loading}>

                <TaxiOutChart
                    data={data.taxiOutHistory}
                    currentAirport={originFilter}
                    onFilterChange={handleFilterChange}
                />

                <LiveArrivalTable data={data.liveBoard} />
            </Spin> */}
        </>
    );
}
