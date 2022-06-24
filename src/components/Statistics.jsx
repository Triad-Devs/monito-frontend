import { useState, useEffect } from "react";
import { getStatistics } from "../services/monitorServices";

import Box from "@mui/material/Box";

const Statistics = ({ statisticsData }) => {
  const [data, setData] = useState(null);
  console.log(statisticsData);
  useEffect(() => {
    getStatistics(statisticsData.id).then((d) => setData(d.data));
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      {data ? (
        <>
          <div>Total Requests: {data.total_requests}</div>
          <div>Successful Requests: {data.success_requests}</div>
          <div>Failed Requests: {data.failed_requests}</div>
          <div>Success Rate(%): {data["success_rate(%)"].toFixed(2)}</div>
          <div>Error Rate(%): {data["error_rate(%)"].toFixed(2)}</div>
          <div>
            Average Response Time(seconds):{" "}
            {data["avg_response_time(s)"].toFixed(3)}
          </div>
          <div>Total bytes transferred: {data.total_bytes_transferred}</div>
          <div>
            Average Bytes Transferred/day: {data.avg_bytes_transferred_per_day}
          </div>
          <p>Daily Statistics:</p>
          <Box sx={{ ml: 2 }}>
            {data.per_day_stats.map((d) => {
              return (
                <div>
                  {new Date(d.day).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                  <Box sx={{ ml: 2, mb: 2 }}>
                    <div>Number of Requests: {d.count}</div>
                    <div>
                      Total bytes transferred:{" "}
                      {d.total_bytes_transferred.toFixed(2)}
                    </div>
                    <div>
                      Average Bytes Transferred:{" "}
                      {d.avg_bytes_transferred.toFixed(2)}
                    </div>
                  </Box>
                </div>
              );
            })}
          </Box>
          <img width={375} src={data.traffic_graph_url} />
          <img width={375} src={data.response_time_graph_url} />
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default Statistics;
