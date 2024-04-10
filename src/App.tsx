import React, { FC, useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { routesTree } from "./struct/routes";

import "./index.scss";

const App: FC = () => {
  const routes = useRoutes(routesTree);
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage && i18n.changeLanguage("ru");
  }, [i18n]);
  return <div className="app">{routes}</div>;
};

export default App;
