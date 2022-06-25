import { useState } from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = ({ actionProvider }) => {
  const [unameError, setUnameError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUnameError(false);
    setPassError(false);

    const data = new FormData(e.currentTarget);

    const formData = {
      username: data.get("username").trim(),
      password: data.get("password").trim(),
    };

    let submit = true;

    if (formData.username === "" || formData.username.length < 4) {
      setUnameError(true);
      submit = false;
      console.log(formData.username);
    }

    if (formData.password === "" || formData.password.length < 6) {
      setPassError(true);
      submit = false;
      console.log(formData.password);
    }

    if (submit) {
      console.log(formData);
      //PERFORM AXIOS POST HERE
      console.log(formData);
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, formData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("userData", JSON.stringify(res.data));
          window.location.reload();
          // actionProvider.postLogin(res);
        })
        .catch((err) => {
          actionProvider.postLogin(err);
          console.log(err);
        });
    }
  };

  return (
    <Box component="form" sx={{ ml: 5 }} onSubmit={handleSubmit}>
      <TextField
        required
        size="small"
        name="username"
        label="Username"
        sx={{ mr: 2, ml: 1 }}
        error={unameError}
      />
      <TextField
        required
        type="password"
        size="small"
        name="password"
        label="Password"
        sx={{ mr: 2, ml: { xs: 1, sm: 0 }, mt: { xs: 1, sm: 0 } }}
        error={passError}
      />
      <Button type="submit" sx={{ mt: { xs: 1, sm: 0 } }} variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default Login;
