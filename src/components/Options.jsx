import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Options = ({ actionProvider }) => {
  return (
    <Box sx={{ ml: 5 }}>
      <Button
        variant="outlined"
        sx={{ ml: 1 }}
        onClick={actionProvider.monitoNewUrl}
      >
        Monitor new URL
      </Button>
      <Button
        sx={{ ml: 1 }}
        variant="outlined"
        onClick={actionProvider.checkExistingUrls}
      >
        Check Existing URLs
      </Button>
    </Box>
  );
};

export default Options;
