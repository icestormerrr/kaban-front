import React, { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import MainLayout from "./pages/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Board from "./pages/Board/Board";
import Task from "./pages/Task/Task";
import Login from "./pages/Login/Login";

import "./global-styles.scss";

const App: FC = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage && i18n.changeLanguage("ru");
  }, [i18n]);
  return (
    <div className="app">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={"board"} element={<Board />} />
          <Route path={"task"}>
            <Route path=":_id" element={<Task />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
