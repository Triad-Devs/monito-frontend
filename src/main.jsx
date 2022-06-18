import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const defaultTheme = createTheme();

let theme = createTheme({
  palette: {
    primary: {
      main: "#4d4d4d",
    },
    secondary: {
      main: "#146eb4",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 10,
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontWeightSemiBold: 700,
    fontWeightExtraBold: 900,
    h1: {
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 900,
    },
    h2: {
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 900,
    },
    h3: {
      fontSize: defaultTheme.typography.pxToRem(36),
      letterSpacing: 0.2,
    },
    h4: {
      fontSize: defaultTheme.typography.pxToRem(28),
      letterSpacing: 0.2,
    },
    h5: {
      fontSize: defaultTheme.typography.pxToRem(24),
      letterSpacing: 0.1,
    },
    h6: {
      fontSize: defaultTheme.typography.pxToRem(20),
    },
    button: {
      textTransform: "initial",
      fontWeight: 700,
      letterSpacing: 0,
    },
    subtitle1: {
      fontSize: defaultTheme.typography.pxToRem(18),
      letterSpacing: 0,
      fontWeight: 400,
    },
    body1: {
      fontSize: defaultTheme.typography.pxToRem(16), // 16px
      letterSpacing: 0,
    },
    body2: {
      fontSize: defaultTheme.typography.pxToRem(14), // 14px
      letterSpacing: 0,
    },
    caption: {
      display: "inline-block",
      fontSize: defaultTheme.typography.pxToRem(12), // 12px
      letterSpacing: 0,
      fontWeight: 700,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
