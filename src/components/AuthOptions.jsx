import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AuthOptions = ({ actionProvider }) => {
  return (
    <Box sx={{ ml: 5 }}>
      <Button
        variant="outlined"
        sx={{ mr: 2, ml: 1 }}
        onClick={actionProvider.login}
      >
        Login
      </Button>
      <Button variant="outlined" onClick={actionProvider.signup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default AuthOptions;
