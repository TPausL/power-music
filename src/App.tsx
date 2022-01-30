import { ThemeProvider } from "@emotion/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppBar from "./components/AppBar";
import Router from "./components/Router";
import { theme } from "./components/theme";
import YoutubeProvider from "./components/YoutubeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <YoutubeProvider>
          <AppBar />
          <Router />
        </YoutubeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
