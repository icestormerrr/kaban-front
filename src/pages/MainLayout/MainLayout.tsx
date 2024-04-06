import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSavedState } from "src/hooks/useSavedState";

import { ACCESS_TOKEN_PERSIST_KEY, USER_PERSIST_KEY, PROJECT_ID_PERSIST_KEY } from "src/config";
import { useGetProjectsQuery, useLazyGetProjectDetailsQuery } from "src/store/projects/api";
import { useLogoutMutation } from "src/store/auth/api";
import { menuRoutes, menuRoteDisplayNameMap } from "src/struct/routes";
import { setProject } from "src/store/projects/slice";
import { UserState } from "src/store/users/types";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import InputSelect from "src/components/input/InputSelect";
import ButtonMenu from "src/components/menu/ButtonMenu";
import AvatarMenu from "src/components/menu/AvatarMenu";
import { ReactComponent as Logo } from "src/assets/logo.svg";

import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);
  const [user] = useSavedState<UserState>(USER_PERSIST_KEY, {} as UserState);
  const [projectId, setProjectId] = useSavedState<string | undefined>(PROJECT_ID_PERSIST_KEY, undefined);

  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery({ userId: user._id });
  const [fetchProjectDetails, { isFetching: isProjectDetailsFetching }] = useLazyGetProjectDetailsQuery();
  const [fetchLogout] = useLogoutMutation();

  const handleProjectChange = (newOption: NApp.NamedEntity | null) => {
    setProjectId(newOption?._id);
  };

  const handleLogout = () => {
    localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, "");
    fetchLogout();
    navigate("/login");
  };

  const handleHomeNavigate = () => {
    navigate("/");
  };

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  const handleTaskCreate = () => {
    navigate("/task");
  };

  const handleProjectCreate = () => {
    navigate("/project");
  };

  const handleRouteNavigate = (route: string) => {
    return () => navigate(`/${route}`);
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails({ _id: projectId })
        .unwrap()
        .then((projectDetails) => dispatch(setProject(projectDetails)))
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

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
            value={projectId ?? null}
            options={projects}
            onChange={handleProjectChange}
            label={t("Project")}
            loadingText={t("Loading")}
            loading={isProjectsFetching}
          />
          {menuRoutes.map((route) => (
            <div
              className={clsx({ [classes.route]: true, [classes.active]: pathname?.includes(route) })}
              onClick={handleRouteNavigate(route)}
              key={route}
            >
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

      {isProjectDetailsFetching && <CircularProgress />}
      {projectId && <Outlet />}
      {!projectId && (
        <GlassContainer className={classes.placeholderContainer}>{t("Select a project to continue...")}</GlassContainer>
      )}
    </>
  );
};

export default MainLayout;
