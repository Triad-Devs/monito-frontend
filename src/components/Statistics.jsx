import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { getStatistics } from "../services/monitorServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




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
                    <Box sx={{mt: 0, p: 1, color: "#ffffff", backgroundColor: "#1f1b24", borderRadius: "5px", maxWidth: { xs: "80vw", md: "50vw" }}}>
                        Total Requests: {data.total_requests}<br/>
                        Successful Requests: {data.success_requests}<br/>
                        Failed Requests: {data.failed_requests}<br/>
                        Success Rate(%): {data["success_rate(%)"].toFixed(2)}<br/>
                        Error Rate(%): {data["error_rate(%)"].toFixed(2)}<br/>
                        Average Response Time(seconds):{" "}{data["avg_response_time(s)"].toFixed(3)}<br/>
                        Total bytes transferred: {data.total_bytes_transferred}<br/>
                        Average Bytes Transferred/day:{" "}{data.avg_bytes_transferred_per_day.toFixed(3)}<br/>
                    </Box>
                    <Box sx={{ mt: 4, mb: 1 }}>
                        <b>Daily Statistics</b>:
                    </Box>
                    <Box>
                        <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
                            <Table
                                size="small"
                                aria-label="a dense table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                            <b>Date</b>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <b>Number of Requests</b>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <b>Total bytes transferred</b>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <b>Average Bytes Transferred</b>
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.per_day_stats.map((d) => {
                                        return (
                                            <StyledTableRow key={d.day}>
                                                <StyledTableCell>
                                                    <b>
                                                        {new Date(d.day).toLocaleDateString("en-IN", {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        })}
                                                    </b>
                                                </StyledTableCell>
                                                <StyledTableCell>{d.count}</StyledTableCell>
                                                <StyledTableCell>
                                                    {d.total_bytes_transferred.toFixed(2)}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {d.avg_bytes_transferred.toFixed(2)}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ mt: 3, mb: 4, display: "flex", flexWrap: "wrap" }}>
                        <Paper elevation={4} sx={{ width: 308, pl: 1 }}>
                            <a
                                href={data.traffic_graph_url}
                                target="_blank"
                                rel="noreferrer">
                                <img
                                    width={300}
                                    src={data.traffic_graph_url}
                                    alt="Traffic Graph"
                                />
                            </a>
                        </Paper>
                        <Paper elevation={4} sx={{ width: 308, pl: 1, ml: { xs: 0, md: 3 }, mt: { xs: 3, sm: 0 } }}>
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
                        </Paper>
                    </Box>
                </>
            ) : (
                "Processing Request..."
            )}
        </Box>
    );
};

export default Statistics;
