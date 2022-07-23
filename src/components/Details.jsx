import { useState, useEffect } from "react";
import { getDetails } from "../services/monitorServices";
import { REPEAT_AFTER, getKeyByValue } from "../utils";
import Editor from "@monaco-editor/react";
import Anchor from "./Anchor";

import Box from "@mui/material/Box";

const Details = ({ detailsData }) => {
  const [data, setData] = useState("Processing request...");

  useEffect(() => {
    getDetails(detailsData.id).then((d) => setData(d.data));
  }, []);

  return (
    <Box
      sx={{
        ml: 6,
        mt: 0,
        p: 1,
        color: "#ffffff",
        backgroundColor: "#1f1b24",
        borderRadius: "5px",
        maxWidth: { xs: "80vw", md: "50vw" },
      }}
    >
      Description: {data.description} <br />
      HTTP Method: {data.httpMethod} <br />
      URL: <Anchor url={data.url} />
      <br />
      Is the URL an API: {data.isAPI ? "Yes" : "No"} <br />
      Authentication Required: {data.authReq ? "Yes" : "No"} <br />
      {data.authReq && (
        <>
          Bearer Token: {data.bearer}
          <br />
        </>
      )}
      Repeat After: {getKeyByValue(REPEAT_AFTER, data.repeatAfter)}
      <br />
      {["PUT", "POST", "PATCH"].includes(data.httpMethod) && (
        <>
          JSON Payload:
          <Editor
            height="20vh"
            theme="vs-dark"
            defaultLanguage="json"
            defaultValue={JSON.stringify(data.JSONbody, null, 2)}
          />
        </>
      )}
    </Box>
  );
};

export default Details;
