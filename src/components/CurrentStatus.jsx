import { useState, useEffect } from "react";
import { getCurrentStatus } from "../services/monitorServices";

import Box from "@mui/material/Box";

const CurrentStatus = ({ currentStatusData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCurrentStatus(currentStatusData.id).then((d) => setData(d));
  }, []);

  return (
    <Box sx={{ ml: 6 }}>
      {data ? (
        <>
          <div>Response Status Code: {data.status}</div>
          <div>Response Status Text: {data.statusText}</div>
          <div>
            {data.status < 400
              ? "Congratulations! The URL is Live!"
              : "OOPS! The URL met an error!"}
          </div>
        </>
      ) : (
        "Processing Request..."
      )}
    </Box>
  );
};

export default CurrentStatus;
