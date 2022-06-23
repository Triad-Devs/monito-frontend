import { useState, useEffect } from "react";
import { CHIP_COLOR } from "../utils";
import { fetchUrls } from "../services/monitorServices";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const URLList = ({ actionProvider, setState }) => {
  const [data, setData] = useState([]);

  const currentStatus = (reqData) => {
    setState((prev) => ({
      ...prev,
      currentStatusData: reqData,
    }));
    console.log(reqData);
    actionProvider.currentStatus(reqData);
  };

  const statistics = (d) => {};

  const details = (d) => {};

  useEffect(() => {
    fetchUrls().then((d) => {
      console.log(d);
      setData(d);
    });
  }, []);

  return (
    <Box sx={{ ml: 6, width: { xs: "85%", md: "75%" } }}>
      {data.map((d) => {
        return (
          <Box
            key={`${d.url}+${d.id}`}
            sx={{
              border: 1,
              my: 1,
              p: 1,
              borderRadius: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                color={CHIP_COLOR[d.httpMethod]}
                variant="filled"
                label={d.httpMethod}
                size="small"
              />
              <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {d.description} (<a href={d.url}>{d.url}</a>)
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{ ml: { xs: 5 }, mt: { xs: 1, md: 0 } }}
            >
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => currentStatus(d)}
                >
                  Current Status
                </Button>
              </div>
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(d) => statistics(d)}
                >
                  View Statistics
                </Button>
              </div>
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={(d) => details(d)}
                >
                  View Details
                </Button>
              </div>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default URLList;
