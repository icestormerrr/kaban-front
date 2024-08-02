import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import { useSavedState } from "@/shared/store";
import { backgroundImagesOptions, Settings, SETTINGS_PERSIST_KEY } from "@/entities/settings";
import { store } from "./store/store";
import { darkTheme } from "./config/theme";
import "./config/i18next";
import { RoutesComponent } from "./router/routes";
import "./global/global.scss";

const App: FC = () => {
  const { i18n } = useTranslation();
  const [settings] = useSavedState<Settings>(SETTINGS_PERSIST_KEY, { backgroundImage: backgroundImagesOptions[1]._id });
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
            <div className="app" style={{ backgroundImage: `url(${settings.backgroundImage})` }}>
              <RoutesComponent />
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
