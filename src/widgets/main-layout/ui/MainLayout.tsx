import React, { FC, useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import { ACCESS_TOKEN_PERSIST_KEY } from "src/shared/const";
import { useSavedState } from "src/shared/lib";
import { USER_PERSIST_KEY, UserState } from "src/entities/user";
import { PROJECT_ID_PERSIST_KEY, useGetProjectsQuery } from "src/entities/project";
import { useLogoutMutation } from "src/entities/user/api/authApi";
import { AvatarMenu, ButtonMenu, GlassContainer, InputSelect } from "src/shared/ui";

import { menuRoteDisplayNameMap, menuRoutes } from "../const/const";
import { ReactComponent as Logo } from "src/widgets/main-layout/assets/logo.svg";

import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);
  const [user] = useSavedState<UserState>(USER_PERSIST_KEY, {} as UserState);
  const [projectId, setProjectId] = useSavedState<string | null>(PROJECT_ID_PERSIST_KEY, "");

  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery({ userId: user._id });

  const [fetchLogout] = useLogoutMutation();
  const handleLogout = () => {
    localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, "");
    localStorage.setItem(PROJECT_ID_PERSIST_KEY, "");
    localStorage.setItem(USER_PERSIST_KEY, "");
    fetchLogout();
    navigate("/login");
  };

  const handleProjectChange = (newOption: NApp.NamedEntity | null) => {
    setProjectId(newOption?._id ?? null);
    navigate(`/project/${newOption?._id}`);
  };

  const handleRouteNavigate = useCallback(
    (route: string) => {
      if (route === "project") {
        return () => navigate(`/project/${projectId}`);
      }
      return () => navigate(`/project/${projectId}/${route}`);
    },
    [navigate, projectId],
  );

  const handleHomeNavigate = () => {
    navigate("/");
  };

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  const handleTaskCreate = () => {
    navigate(`/project/${projectId}/task`);
  };

  const handleProjectCreate = () => {
    setProjectId("");
    navigate("/project");
  };

  useEffect(() => {
    !isAuth && handleLogout();
  }, [isAuth, navigate]);

  return (
    <>
      <GlassContainer className={classes.headerContainer}>
        <div className={classes.leftContainer}>
          <Logo onClick={handleHomeNavigate} style={{ cursor: "pointer" }} />
          <InputSelect
            disableClearable
            className={classes.projectSelect}
            value={projectId}
            options={projects}
            onChange={handleProjectChange}
            label={t("Project")}
            loadingText={t("Loading")}
            loading={isProjectsFetching}
          />

          {menuRoutes.map((route) => (
            <div className={classes.route} onClick={handleRouteNavigate(route)} key={route}>
              {t(menuRoteDisplayNameMap[route])}
            </div>
          ))}

          <ButtonMenu label={t("Create")}>
            <MenuItem onClick={handleTaskCreate} disableRipple>
              {t("Task")}
            </MenuItem>
            <MenuItem onClick={handleProjectCreate} disableRipple>
              {t("Project")}
            </MenuItem>
          </ButtonMenu>
        </div>

        <AvatarMenu label={user?.name?.[0]}>
          <MenuItem onClick={handleSettingsNavigate}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {t("Settings")}
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t("Logout")}
          </MenuItem>
        </AvatarMenu>
      </GlassContainer>
      <Outlet />
    </>
  );
};

export default MainLayout;
