import { useState, useEffect } from "react";
import { getStatistics } from "../services/monitorServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

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
          <TableContainer>
            <Table
              sx={{ maxWidth: 700 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Total Requests</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.total_requests}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Successful Requests</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.success_requests}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Failed Requests</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.failed_requests}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Success Rate(%)</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data["success_rate(%)"].toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Error Rate(%)</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data["error_rate(%)"].toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Average Response Time(seconds)</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data["avg_response_time(s)"].toFixed(3)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Total bytes transferred</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.total_bytes_transferred}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Average Bytes Transferred/day</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.avg_bytes_transferred_per_day.toFixed(3)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <p>
            <b>Daily Statistics</b>:
          </p>
          <Box>
            <TableContainer>
              <Table
                sx={{ maxWidth: 700 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ border: 1 }}>
                      <b>Date</b>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <b>Number of Requests</b>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <b>Total bytes transferred</b>
                    </TableCell>
                    <TableCell sx={{ border: 1 }}>
                      <b>Average Bytes Transferred</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.per_day_stats.map((d) => {
                    return (
                      <TableRow key={d.day}>
                        <TableCell sx={{ border: 1 }}>
                          <b>
                            {new Date(d.day).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </b>
                        </TableCell>
                        <TableCell sx={{ border: 1 }}>{d.count}</TableCell>
                        <TableCell sx={{ border: 1 }}>
                          {d.total_bytes_transferred.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ border: 1 }}>
                          {d.avg_bytes_transferred.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <a href={data.traffic_graph_url} target="_blank" rel="noreferrer">
            <img width={300} src={data.traffic_graph_url} alt="Traffic Graph" />
          </a>
          <a
            href={data.response_time_graph_url}
            target="_blank"
            rel="noreferrer"
          >
            <img
              width={300}
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
