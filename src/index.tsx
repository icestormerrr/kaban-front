import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";

import { store } from "./app/store";
import App from "./app/App";
import { darkTheme } from "./app/config/config";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
);
