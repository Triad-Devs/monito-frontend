import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
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

    if (submit) {
      console.log(formData);
      //PERFORM AXIOS POST HERE
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
        sx={{ mr: 2 }}
        error={passError}
      />
      <Button type="submit" sx={{ mt: 0.2 }} variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default Login;
