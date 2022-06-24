import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { getDetails } from "../services/monitorServices";
import { REPEAT_AFTER, getKeyByValue } from "../utils";

import Box from "@mui/material/Box";

const Details = ({ detailsData }) => {
  const [data, setData] = useState("Processing request...");

  useEffect(() => {
    getDetails(detailsData.id).then((d) => setData(d.data));
  }, []);

  return (
    <div>
      <Box sx={{ ml: 6 }}>
        <div>Description: {data.description}</div>
        <div>HTTP Method: {data.httpMethod}</div>
        <div>
          URL: <a href={data.url}>{data.url}</a>
        </div>
        <div>Is the URL an API: {data.isAPI ? "Yes" : "No"}</div>
        <div>Authentication Required: {data.authReq ? "Yes" : "No"}</div>
        {data.authReq && <div>Bearer Token: {data.bearer}</div>}
        <div>Repeat After: {getKeyByValue(REPEAT_AFTER, data.repeatAfter)}</div>
        {["PUT", "POST", "PATCH"].includes(data.httpMethod) && (
          <>
            <div>JSON Payload:</div>
            <div>
              <pre>{data.JSONbody}</pre>
            </div>
          </>
        )}
      </Box>
    </div>
  );
};

export default Details;
