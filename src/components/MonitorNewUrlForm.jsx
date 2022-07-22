import { useState } from "react";

import Editor from "@monaco-editor/react";
import { REQUEST_VERBS, REPEAT_AFTER } from "../utils";
import { postNewUrl } from "../services/monitorServices";
import { createChatBotMessage } from "react-chatbot-kit";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MonitorNewUrlForm = ({ actionProvider }) => {
  const [isApi, setIsApi] = useState(false);
  const [authReq, setAuthReq] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [repeatAfter, setRepeatAfter] = useState(5);
  const [httpMethod, setHttpMethod] = useState("GET");
  const [editorValue, setEditorValue] = useState("{}");
  const [editorError, setEditorError] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const handleHttpMethodChange = (event) => {
    setHttpMethod(event.target.value);
    if (event.target.value === "GET" || event.target.value === "DELETE") {
      setEditorValue("{}");
    }
  };

  const handleRepeatChange = (event) => setRepeatAfter(event.target.value);

  const handleEditorChange = (value, event) => setEditorValue(value);

  console.log({ authReq, isApi, repeatAfter });

  const handleSubmit = (e) => {
    e.preventDefault();

    setUrlError(false);
    setEditorError(false);
    setAlertError(true);

    const data = new FormData(e.currentTarget);

    const formData = {
      description: data.get("description").trim(),
      alertThreshold: data.get("alertThreshold").trim(),
      bearer: authReq ? data.get("bearer").trim() : "",
      url: data.get("url").trim(),
      JSONbody: editorValue,
      isAPI: isApi,
      httpMethod,
      authReq,
      repeatAfter,
    };

    let submit = true;
    console.log(formData);

    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

    if (!urlRegex.test(formData.url)) {
      submit = false;
      setUrlError(true);
    }

    if (!formData.alertThreshold || formData.alertThreshold === 0) {
      submit = false;
      setAlertError(true);
    }

    try {
      const json = JSON.parse(formData.JSONbody);
    } catch {
      submit = false;
      setEditorError(true);
      console.log("editor haga");
    }

    if (submit) {
      console.log(formData);
      //PERFORM AXIOS POST HERE
      postNewUrl(formData)
        .then((d) => {
          actionProvider.addMessageToState(
            createChatBotMessage(
              `The URL ${d.data.url} is now being monitored!`,
              { widget: "Options" }
            )
          );
        })
        .catch((err) => {
          actionProvider.addMessageToState(
            createChatBotMessage(`We met an error please try again :(`, {
              widget: "Options",
            })
          );
        });
    }
  };

  return (
    <Box
      component="form"
      sx={{ ml: 6, width: { xs: "80%", md: "40%" } }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        size="small"
        name="description"
        label="Description"
        sx={{ mr: 2, mb: 1 }}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isApi}
            onChange={(e) => setIsApi(e.target.checked)}
          />
        }
        label="Is the URL an API?"
      />
      <FormControl sx={{ mr: 1, minWidth: 120 }} size="small">
        <InputLabel id="repeat-after">Repeat After</InputLabel>
        <Select
          labelId="repeat-after"
          id="repeat-after"
          value={repeatAfter}
          label="Repeat After"
          onChange={handleRepeatChange}
        >
          {Object.keys(REPEAT_AFTER).map((k) => (
            <MenuItem key={k} value={REPEAT_AFTER[k]}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        size="small"
        name="alertThreshold"
        label="Error Threshold"
        type="number"
        error={alertError}
        sx={{ mr: 2, mb: 1 }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 2,
          width: "100%",
        }}
      >
        <FormControl sx={{ mr: 1, minWidth: 100 }} size="small">
          <InputLabel id="method">Method</InputLabel>
          <Select
            labelId="method"
            id="method"
            value={httpMethod}
            label="Method"
            onChange={handleHttpMethodChange}
          >
            {isApi ? (
              REQUEST_VERBS.map((verb) => (
                <MenuItem key={verb} value={verb}>
                  {verb}
                </MenuItem>
              ))
            ) : (
              <MenuItem key="GET" value="GET">
                GET
              </MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          required
          size="small"
          name="url"
          label="URL"
          sx={{ ml: 1 }}
          error={urlError}
          fullWidth
        />
      </Box>
      {urlError && <div>Please enter a valid URL!</div>}
      {isApi && (
        <FormControlLabel
          control={
            <Checkbox
              checked={authReq}
              onChange={(e) => setAuthReq(e.target.checked)}
            />
          }
          label="Authentication Required?"
          sx={{ my: 0.5 }}
        />
      )}
      {authReq && (
        <TextField
          required
          size="small"
          name="bearer"
          label="Bearer token"
          sx={{ mr: 2, my: 1 }}
          fullWidth
        />
      )}
      {["PUT", "POST", "PATCH"].includes(httpMethod) && (
        <Box>
          <div>Enter JSON Payload:</div>
          <Editor
            height="20vh"
            defaultLanguage="json"
            value={editorValue}
            onChange={handleEditorChange}
          />
          {editorError && <div>Enter valid JSON!</div>}
        </Box>
      )}
      <Box sx={{ mt: { xs: 1, md: 0 } }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MonitorNewUrlForm;
