import { useState, useEffect } from "react";
import { getDetails } from "../services/monitorServices";
import { REPEAT_AFTER, getKeyByValue } from "../utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";

const Details = ({ detailsData }) => {
  const [data, setData] = useState("Processing request...");

  useEffect(() => {
    getDetails(detailsData.id).then((d) => setData(d.data));
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      <TableContainer>
        <Table sx={{ maxWidth: 700 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>Description</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>{data.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>HTTP Method</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>{data.httpMethod}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>URL</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>
                <a href={data.url}>{data.url}</a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>Is the URL an API</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>
                {data.isAPI ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>Authentication Required</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>
                {data.authReq ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            {data.authReq && (
              <TableRow>
                <TableCell sx={{ border: 1 }}>
                  <b>Bearer Token</b>
                </TableCell>
                <TableCell sx={{ border: 1 }}>{data.bearer}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ border: 1 }}>
                <b>Repeat After</b>
              </TableCell>
              <TableCell sx={{ border: 1 }}>
                {getKeyByValue(REPEAT_AFTER, data.repeatAfter)}
              </TableCell>
            </TableRow>
            {["PUT", "POST", "PATCH"].includes(data.httpMethod) && (
              <>
                <TableRow>
                  <TableCell sx={{ border: 1 }}>
                    <b>JSON Payload</b>
                  </TableCell>
                  <TableCell sx={{ border: 1 }}>
                    <pre>{data.JSONbody}</pre>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Details;
