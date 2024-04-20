import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

import { store } from "./store/store";
import { darkTheme } from "./config/config";
import { RoutesComponent } from "./router/routes";

import "./styles/global.scss";

const App: FC = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage && i18n.changeLanguage("ru");
  }, [i18n]);
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <SnackbarProvider
            preventDuplicate
            autoHideDuration={3000}
            maxSnack={3}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <RoutesComponent />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
