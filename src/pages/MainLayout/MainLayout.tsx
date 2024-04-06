import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";
import clsx from "clsx";

import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSavedState } from "src/hooks/useSavedState";

import { ACCESS_TOKEN_PERSIST_KEY, USER_PERSIST_KEY, PROJECT_ID_PERSIST_KEY } from "src/config";
import { useGetProjectsQuery, useLazyGetProjectDetailsQuery } from "src/store/projects/api";
import { menuRoutes, menuRoteDisplayNameMap } from "src/struct/routes";
import { setProject } from "src/store/projects/slice";
import { UserState } from "src/store/users/types";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import InputSelect from "src/components/input/InputSelect";
import { ReactComponent as Logo } from "src/assets/logo.svg";

import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);
  const [user] = useSavedState<UserState>(USER_PERSIST_KEY, {} as UserState);
  const [selectedProjectId, setSelectedProjectId] = useSavedState<string | undefined>(
    PROJECT_ID_PERSIST_KEY,
    undefined,
  );

  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery(
    user._id ? { userId: user._id } : skipToken,
  );
  const [fetchProject] = useLazyGetProjectDetailsQuery();

  const handleProjectChange = (newOption: NApp.NamedEntity | null) => {
    setSelectedProjectId(newOption?._id);
  };

  useEffect(() => {
    if (selectedProjectId) {
      fetchProject({ _id: selectedProjectId })
        .unwrap()
        .then((projectDetails) => dispatch(setProject(projectDetails)))
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId]);

  useEffect(() => {
    !isAuth && navigate("/login");
  }, [isAuth, navigate]);

  return (
    <>
      <GlassContainer className={classes.headerContainer}>
        <div className={classes.leftContainer}>
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          <InputSelect
            disableClearable
            className={classes.projectSelect}
            value={selectedProjectId ?? null}
            options={projects}
            onChange={handleProjectChange}
            label={t("Project")}
            loadingText={t("Loading")}
            loading={isProjectsFetching}
          />
          {menuRoutes.map((route) => (
            <div
              className={clsx({ [classes.route]: true, [classes.active]: pathname?.includes(route) })}
              onClick={() => navigate(`/${route}`)}
              key={route}
            >
              {t(menuRoteDisplayNameMap[route])}
            </div>
          ))}
        </div>
        <Avatar className={classes.avatar}>{user.name?.[0]}</Avatar>
      </GlassContainer>
      {selectedProjectId ? (
        <Outlet />
      ) : (
        <GlassContainer className={classes.placeholderContainer}>{t("Select a project to continue...")}</GlassContainer>
      )}
    </>
  );
};

export default MainLayout;
