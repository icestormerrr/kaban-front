import React, { FC, useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

import { useTranslation } from "react-i18next";

import { useSavedState } from "src/shared/lib/hooks/useSavedState";

import { ACCESS_TOKEN_PERSIST_KEY } from "src/app/config/config";
import { useGetProjectsQuery, useLazyGetProjectDetailsQuery } from "src/entities/project/api/projectApi";
import { useLogoutMutation } from "src/pages/login/api/authApi";
import { UserState } from "src/entities/user/model/types";

import GlassContainer from "src/shared/ui/containers/glass-container/GlassContainer";
import InputSelect from "src/shared/ui/inputs/InputSelect";
import ButtonMenu from "src/shared/ui/menus/ButtonMenu";
import AvatarMenu from "src/shared/ui/menus/AvatarMenu";
import { ReactComponent as Logo } from "src/widgets/main-layout/assets/logo.svg";

import classes from "./MainLayout.module.scss";
import { PROJECT_ID_PERSIST_KEY } from "../../../entities/project/const/const";
import { USER_PERSIST_KEY } from "../../../entities/user/const/const";
import { menuRoteDisplayNameMap, menuRoutes } from "../const/const";

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
    !isAuth && navigate("/login");
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
