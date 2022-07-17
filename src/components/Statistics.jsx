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
          <div>
            <b>Total Requests</b>: {data.total_requests}
          </div>
          <div>
            <b>Successful Requests</b>: {data.success_requests}
          </div>
          <div>
            <b>Failed Requests</b>: {data.failed_requests}
          </div>
          <div>
            <b>Success Rate(%)</b>: {data["success_rate(%)"].toFixed(2)}
          </div>
          <div>
            <b>Error Rate(%)</b>: {data["error_rate(%)"].toFixed(2)}
          </div>
          <div>
            <b>Average Response Time(seconds)</b>:{" "}
            {data["avg_response_time(s)"].toFixed(3)}
          </div>
          <div>
            <b>Total bytes transferred</b>: {data.total_bytes_transferred}
          </div>
          <div>
            <b>Average Bytes Transferred/day</b>:{" "}
            {data.avg_bytes_transferred_per_day.toFixed(3)}
          </div>
          <p>
            <b>Daily Statistics</b>:
          </p>
          <Box sx={{ ml: 2 }}>
            {data.per_day_stats.map((d) => {
              return (
                <div key={d.day}>
                  <div>
                    <b>
                      {new Date(d.day).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </b>
                  </div>
                  <Box sx={{ ml: 2, mb: 2 }}>
                    <div>
                      <b>Number of Requests</b>: {d.count}
                    </div>
                    <div>
                      <b>Total bytes transferred</b>:{" "}
                      {d.total_bytes_transferred.toFixed(2)}
                    </div>
                    <div>
                      <b>Average Bytes Transferred</b>:{" "}
                      {d.avg_bytes_transferred.toFixed(2)}
                    </div>
                  </Box>
                </div>
              );
            })}
          </Box>
          <a href={data.traffic_graph_url} target="_blank" rel="noreferrer">
            <img width={375} src={data.traffic_graph_url} alt="Traffic Graph" />
          </a>
          <a href={data.traffic_graph_url} target="_blank" rel="noreferrer">
            <img
              width={375}
              src={data.response_time_graph_url}
              alt="Response Time Graph"
            />
          </a>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default Statistics;
