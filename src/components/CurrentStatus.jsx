import { useState, useEffect } from "react";
import { getCurrentStatus } from "../services/monitorServices";

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
            <b>Response Time</b>: {data.time_taken}
          </div>
          <div>
            <b>Response Status Code</b>: {data.status_code}
          </div>
          <div>
            <b>Response Status Text</b>: {data.status_text}
          </div>
          <div>
            <b>Content Length</b>: {data.content_length}
          </div>
          <div>
            <b>Content Type</b>: {data.content_type}
          </div>
          {["GET"].includes(data.httpMethod) && data.isAPI && (
            <>
              <div>
                <b>JSON Response</b>:
              </div>
              <div>
                <pre>{JSON.stringify(data.jsonBody, null, 2)}</pre>
              </div>
            </>
          )}
          <div>
            <b>
              {data.status_code < 400
                ? "Congratulations! The URL is Live!"
                : "OOPS! The URL met an error!"}
            </b>
          </div>
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default CurrentStatus;
