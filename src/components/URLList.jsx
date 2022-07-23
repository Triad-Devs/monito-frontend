import { useState, useEffect, forwardRef } from "react";
import { CHIP_COLOR } from "../utils";
import { fetchUrls } from "../services/monitorServices";
import { getLightHouseUrl } from "../services/lightHouseServices";
import MonitorNewUrlForm from "./MonitorNewUrlForm";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Iframe from "react-iframe";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const URLList = ({ actionProvider, setState }) => {
  const [apis, setApis] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [iframeLink, setIframeLink] = useState("");

  const handleLightHouseClickOpen = async (headerText, url) => {
    const userId = JSON.parse(localStorage.getItem("userData")).userId;
    const lightHouseUrl = await getLightHouseUrl({ id: userId, url });
    setOpen(true);
    setModalHeader(headerText);
    setIframeLink(lightHouseUrl);
  };

  const handleClickOpen = (headerText, link) => {
    setOpen(true);
    setModalHeader(headerText);
    setIframeLink(link);
  };

  const handleClose = () => {
    setOpen(false);
    setModalHeader("");
    setIframeLink("");
  };

  const currentStatus = (reqData) => {
    setState((prev) => ({
      ...prev,
      currentStatusData: reqData,
    }));
    console.log(reqData);
    actionProvider.currentStatus(reqData);
  };

  const statistics = (reqData) => {
    setState((prev) => ({
      ...prev,
      statisticsData: reqData,
    }));
    console.log(reqData);
    actionProvider.urlStatistics(reqData);
  };

  const details = (reqData) => {
    setState((prev) => ({
      ...prev,
      detailsData: reqData,
    }));
    console.log(reqData);
    actionProvider.details(reqData);
  };

  useEffect(() => {
    fetchUrls().then((d) => {
      console.log(d);
      const onlyApis = d.filter((l) => l.isAPI);
      const onlyWebsites = d.filter((l) => !l.isAPI);
      console.log({ onlyApis, onlyWebsites });
      setApis(onlyApis);
      setWebsites(onlyWebsites);
    });
  }, []);

  return (
    <>
      {apis.length === 0 && websites.length === 0 ? (
        <>
          <Box sx={{ ml: 6, mb: 1 }}>
            No existing URLs to monitor. Please enter new URL.
          </Box>
          <MonitorNewUrlForm />
        </>
      ) : (
        <>
          <Box sx={{ ml: 6, width: { xs: "85%", md: "75%" } }}>
            <div>
              <b>{apis.length > 0 && "API endpoints"}</b>
            </div>
            {apis.map((d) => {
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
                    <Typography
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
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
                        onClick={() => statistics(d)}
                      >
                        View Statistics
                      </Button>
                    </div>
                    <div>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => details(d)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Stack>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ ml: 6, width: { xs: "85%", md: "75%" } }}>
            <div>
              <b>{websites.length > 0 && "Webpages"}</b>
            </div>
            {websites.map((d) => {
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
                    <Typography
                      sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {d.description} (<a href={d.url}>{d.url}</a>)
                    </Typography>
                  </Stack>
                  <Stack
                    direction="column"
                    spacing={1}
                    sx={{ ml: { xs: 5 }, mt: { xs: 1, md: 0 } }}
                  >
                    <Stack direction="row" spacing={1}>
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
                          onClick={() => statistics(d)}
                        >
                          View Statistics
                        </Button>
                      </div>
                      <div>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => details(d)}
                        >
                          View Details
                        </Button>
                      </div>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <div>
                        <Button
                          LinkComponent="a"
                          href={`https://sitecheck.sucuri.net/results/${d.url}`}
                          size="small"
                          variant="outlined"
                          target="_blank"
                        >
                          Security Report
                        </Button>
                      </div>
                      <div>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            handleLightHouseClickOpen("Audit Report", d.url)
                          }
                        >
                          Audit Report
                        </Button>
                      </div>
                    </Stack>
                  </Stack>
                  <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                  >
                    <AppBar sx={{ position: "relative" }}>
                      <Toolbar>
                        <Typography
                          sx={{ ml: 2, flex: 1 }}
                          variant="h6"
                          component="div"
                        >
                          {modalHeader}
                        </Typography>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleClose}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <Iframe
                      url={iframeLink}
                      width="100%"
                      height="4500px"
                      scrolling="yes"
                      loading="lazy"
                    />
                  </Dialog>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </>
  );
};

export default URLList;
