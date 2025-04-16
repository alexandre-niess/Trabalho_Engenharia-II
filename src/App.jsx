import { createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  const temaRest = createTheme({
    palette: {
      primary: {
        main: "#F05738", // cor primaria
      },
      background: {
        default: "#fff",
        secondary: "#f5f5f5",
        cinza: "#CFCFCF",
      },
      text: {
        primary: "#333333",
        secondary: "#8C8C8C",
        white: "#fff",
        details: "#8C8C8C",
      },
      decorations: {
        divider: "#DCDCDC",
      },
    },
    shape: {
      borderRadius: 5,
    },
    typography: {
      fontFamily: "Lexend, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={temaRest}>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
