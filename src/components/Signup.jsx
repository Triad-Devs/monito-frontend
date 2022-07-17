import { useState } from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Signup = ({ actionProvider }) => {
  const [passError, setPassError] = useState(false);
  const [unameError, setUnameError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPassError(false);
    setUnameError(false);
    setFnameError(false);
    setLnameError(false);
    setEmailError(false);

    const data = new FormData(e.currentTarget);

    const formData = {
      username: data.get("username").trim(),
      password: data.get("password").trim(),
      first_name: data.get("firstName").trim(),
      last_name: data.get("lastName").trim(),
      email: data.get("email").trim(),
    };

    let submit = true;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email === "" || !emailRegex.test(formData.email)) {
      setEmailError(true);
      submit = false;
      console.log(formData.email);
    }

    if (formData.username === "" || formData.username.length < 6) {
      setUnameError(true);
      submit = false;
      console.log(formData.username);
    }

    if (formData.password === "" || formData.password.length < 6) {
      setPassError(true);
      submit = false;
      console.log(formData.password);
    }

    if (formData.first_name === "" || formData.first_name.length < 2) {
      setFnameError(true);
      submit = false;
      console.log(formData.first_name);
    }

    if (formData.last_name === "" || formData.last_name.length < 2) {
      setLnameError(true);
      submit = false;
      console.log(formData.first_name);
    }

    if (submit) {
      console.log(formData);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}auth/register`, formData)
        .then((res) => {
          console.log(res);
          actionProvider.postSignup(res);
        })
        .catch((err) => {
          actionProvider.postSignup(err);
          console.log(err);
        });
    }
  };

  return (
    <Box component="form" sx={{ ml: 5 }} onSubmit={handleSubmit}>
      <Box sx={{ mb: 1 }}>
        <TextField
          required
          size="small"
          name="firstName"
          label="First Name"
          sx={{ mr: 2, ml: 1 }}
          error={fnameError}
        />
        <TextField
          required
          size="small"
          name="lastName"
          label="Last Name"
          sx={{ mr: 2, ml: { xs: 1, sm: 0 }, mt: { xs: 1, sm: 0 } }}
          error={lnameError}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <TextField
          required
          size="small"
          name="email"
          label="email"
          sx={{ mr: 2, ml: 1 }}
          error={emailError}
        />
        <TextField
          required
          size="small"
          name="username"
          label="Username"
          sx={{ mr: 2, ml: { xs: 1, sm: 0 }, mt: { xs: 1, sm: 0 } }}
          error={unameError}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        <TextField
          required
          type="password"
          size="small"
          name="password"
          label="Password"
          sx={{ mr: 1, ml: 1 }}
          error={passError}
        />
        <Box sx={{ my: 1, ml: 1 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
