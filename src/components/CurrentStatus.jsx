import { useState, useEffect } from "react";
import { getCurrentStatus } from "../services/monitorServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";

const CurrentStatus = ({ currentStatusData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentStatus(currentStatusData.id).then((d) => setData(d.data));
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      {data ? (
        <>
          <div>
            <b>
              {data.status_code < 400
                ? "Congratulations! The URL is Live!"
                : "OOPS! The URL met an error!"}
            </b>
          </div>
          <TableContainer>
            <Table
              sx={{ maxWidth: 700 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Response Time</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>{data.time_taken}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Response Status Code</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>{data.status_code}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Response Status Text</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>{data.status_text}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Content Length</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    {data.content_length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>Content Type</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>{data.content_type}</TableCell>
                </TableRow>
                {["GET"].includes(data.httpMethod) && data.isAPI && (
                  <>
                    <TableRow>
                      <TableCell sx={{ border: 1 }}>
                        <b>JSON Response</b>:
                      </TableCell>
                      <TableCell sx={{ border: 1 }}>
                        <pre>{JSON.stringify(data.jsonBody, null, 2)}</pre>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default CurrentStatus;
