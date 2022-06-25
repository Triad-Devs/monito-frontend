import { useState, useEffect } from "react";
import { getDetails } from "../services/monitorServices";
import { REPEAT_AFTER, getKeyByValue } from "../utils";

import Box from "@mui/material/Box";

const Details = ({ detailsData }) => {
  const [data, setData] = useState("Processing request...");

  useEffect(() => {
    getDetails(detailsData.id).then((d) => setData(d.data));
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      <div>
        <b>Description</b>: {data.description}
      </div>
      <div>
        <b>HTTP Method</b>: {data.httpMethod}
      </div>
      <div>
        <b>URL</b>: <a href={data.url}>{data.url}</a>
      </div>
      <div>
        <b>Is the URL an API</b>: {data.isAPI ? "Yes" : "No"}
      </div>
      <div>
        <b>Authentication Required</b>: {data.authReq ? "Yes" : "No"}
      </div>
      {data.authReq && (
        <div>
          <b>Bearer Token</b>: {data.bearer}
        </div>
      )}
      <div>
        <b>Repeat After</b>: {getKeyByValue(REPEAT_AFTER, data.repeatAfter)}
      </div>
      {["PUT", "POST", "PATCH"].includes(data.httpMethod) && (
        <>
          <div>
            <b>JSON Payload</b>:
          </div>
          <div>
            <pre>{JSON.stringify(data.JSONbody, null, 2)}</pre>
          </div>
        </>
      )}
    </Box>
  );
};

export default Details;
