import React, { FC, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

import { useAppSelector, useEditorSlice } from "@/shared/store";
import { useGetProjectsQuery, useProjectIdFromPath } from "@/entities/project";
import { useLazyGetCurrentUserQuery, useLogoutMutation, UserState } from "@/entities/user";
import { AvatarMenu, ButtonMenu, InputSelect } from "@/shared/ui";
import { ACCESS_TOKEN_PERSIST_KEY } from "@/shared/const";

import Logo from "@/widgets/main-layout/assets/logo.svg?react";
import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [showLayoutDetails, setShowLayoutDetails] = useState(true);

  const { entitySelector: userSelector, setEntity: setUser } = useEditorSlice<UserState>("user");
  const user = useAppSelector(userSelector) || {};
  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);

  const projectId = useProjectIdFromPath();
  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery(
    { userId: user.id ?? "" },
    { skip: !user.id },
  );

  const [fetchLogout] = useLogoutMutation();
  const handleLogout = useCallback(() => {
    fetchLogout();
    navigate("/login");
  }, [fetchLogout, navigate]);

  const handleProjectChange = (newOption: Shared.NamedEntity | null) => {
    const pathArray = pathname.split("/");
    const newProjectId = newOption?.id ?? "";
    if (pathArray[2]?.length) {
      pathArray[2] = newProjectId;
      navigate(pathArray.join("/"));
    } else {
      navigate(`/project/${newProjectId}`);
    }
  };

  const handleProjectRouteNavigate = useCallback(
    (route: string) => {
      if (route === "project") {
        return () => navigate(`/project/${projectId}`);
      }
      return () => navigate(`/project/${projectId}/${route}`);
    },
    [navigate, projectId],
  );

  const handleHomeNavigate = () => {
    if (projectId) {
      navigate(`/project/${projectId}/home`);
    } else {
      navigate("/");
    }
  };

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  const handleTaskCreate = () => {
    navigate(`/project/${projectId}/task`);
  };

  const handleProjectCreate = () => {
    navigate("/project");
  };

  const toggleLayoutDetails = () => setShowLayoutDetails((old) => !old);

  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();
  useEffect(() => {
    fetchCurrentUser()
      .unwrap()
      .then((data) => setUser(data as UserState))
      .catch(console.error);
  }, [fetchCurrentUser, setUser]);

  useEffect(() => {
    if (!isAuth) handleLogout();
  }, [handleLogout, isAuth, navigate]);

  return (
    <>
      <header className={classes.headerContainer}>
        <div className={classes.logoContainer}>
          <Logo onClick={handleHomeNavigate} style={{ cursor: "pointer", height: 38 }} />
          <IconButton
            onClick={toggleLayoutDetails}
            style={{
              transform: `rotate(${showLayoutDetails ? 0 : 180}deg)`,
              transition: "transform .5s",
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>

        <nav className={classes.navContainer} style={{ display: showLayoutDetails ? "flex" : "none" }}>
          <div className={classes.projectSelectContainer}>
            <InputSelect
              className={classes.projectSelect}
              value={projectId ?? null}
              options={projects}
              onChange={handleProjectChange}
              placeholder={t("Project")}
              loadingText={t("Loading")}
              loading={isProjectsFetching}
              noOptionMessage={t("You have not been added to any project yet")}
              required
              fullWidth
            />
            <IconButton onClick={handleProjectRouteNavigate("project")}>
              <EditIcon />
            </IconButton>
          </div>

          <Button className={classes.route} onClick={handleProjectRouteNavigate("board")}>
            {t("Board")}
          </Button>
          <Button className={classes.route} onClick={handleProjectRouteNavigate("backlog")}>
            {t("Backlog")}
          </Button>
          <ButtonMenu label={t("Create")}>
            <MenuItem onClick={handleTaskCreate} disableRipple>
              {t("Task")}
            </MenuItem>
            <MenuItem onClick={handleProjectCreate} disableRipple>
              {t("Project")}
            </MenuItem>
          </ButtonMenu>
        </nav>

        {showLayoutDetails && (
          <AvatarMenu label={user?.name?.[0] ?? ""}>
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
        )}
      </header>
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
