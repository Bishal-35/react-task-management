import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import TaskDashboard from "./Context/TaskDashboard";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    error: {
      main: "#d32f2f",
    },
    info: {
      main: "#0288d1",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaskDashboard />
    </ThemeProvider>
  );
}

export default App;
