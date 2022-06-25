import { useState, useEffect } from "react";
import { getCurrentStatus } from "../services/monitorServices";

import Box from "@mui/material/Box";

const CurrentStatus = ({ currentStatusData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentStatus(currentStatusData.id).then((d) => setData(d));
  }, []);
  console.log({ data });

  return (
    <Box sx={{ ml: 6 }}>
      {data ? (
        <>
          <div>
            <b>Response Status Code</b>: {data.status}
          </div>
          <div>
            <b>Response Status Text</b>: {data.statusText}
          </div>
          <div>
            <b>Content Length</b>: {data.headers["content-length"]}
          </div>
          <div>
            <b>Content Type</b>: {data.headers["content-type"]}
          </div>
          <div>
            <b>
              {data.status < 400
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
