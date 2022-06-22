import { useState, useEffect } from "react";
import { CHIP_COLOR } from "../utils";
import { fetchUrls } from "../services/monitorServices";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const URLList = ({ actionProvider }) => {
  const [data, setData] = useState([]);

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
              <Button
                size="small"
                variant="outlined"
                // onClick={(d) => actionProvider.checkCurrentStatus(d)}
              >
                Check Current Status
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={actionProvider.viewStatistics}
              >
                View Statistics
              </Button>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default URLList;
