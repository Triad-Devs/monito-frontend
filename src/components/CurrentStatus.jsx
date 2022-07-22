import { useState, useEffect } from "react";
import { getCurrentStatus } from "../services/monitorServices";
import Editor from "@monaco-editor/react";

import Box from "@mui/material/Box";

const CurrentStatus = ({ currentStatusData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentStatus(currentStatusData.id).then((d) => setData(d.data));
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
      {data ? (
        <>
          <div>
            <b>
              {data.status_code < 400
                ? "Congratulations! The URL is Live!"
                : "OOPS! The URL met an error!"}
            </b>
          </div>
          Response Time: {data.time_taken} <br />
          Response Status Code: {data.status_code} <br />
          Response Status Text: {data.status_text} <br />
          Content Length: {data.content_length} <br />
          Content Type: {data.content_type} <br />
          {["GET"].includes(data.httpMethod) && data.isAPI && (
            <>
              JSON Response:
              <Editor
                height="20vh"
                defaultLanguage="json"
                defaultValue={JSON.stringify(data.jsonBody, null, 2)}
              />
            </>
          )}
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default CurrentStatus;
