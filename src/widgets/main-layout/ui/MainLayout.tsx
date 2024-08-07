import React, { FC, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, IconButton, ListItemIcon, MenuItem } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";

import { useAppSelector, useEditorSlice } from "@/shared/store";
import { useGetProjectsQuery, useProjectIdFromPath } from "@/entities/project";
import { useLazyGetCurrentUserQuery, useLogoutMutation, UserState } from "@/entities/user";
import { AvatarMenu, ButtonMenu, GlassContainer, InputSelect } from "@/shared/ui";
import { ACCESS_TOKEN_PERSIST_KEY } from "@/shared/const";

import { ReactComponent as Logo } from "@/widgets/main-layout/assets/logo.svg";
import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLayoutDetails, setShowLayoutDetails] = useState(true);

  const { entitySelector: userSelector, setEntity: setUser } = useEditorSlice<UserState>("user");
  const user = useAppSelector(userSelector) || {};
  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);

  const projectId = useProjectIdFromPath();
  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery(
    { userId: user._id ?? "" },
    { skip: !user._id },
  );

  const [fetchLogout] = useLogoutMutation();
  const handleLogout = useCallback(() => {
    fetchLogout();
    navigate("/login");
  }, [fetchLogout, navigate]);

  const handleProjectChange = (newOption: NApp.NamedEntity | null) => {
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
    !isAuth && handleLogout();
  }, [handleLogout, isAuth, navigate]);

  return (
    <>
      <GlassContainer className={classes.headerContainer}>
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
              label={t("Project")}
              loadingText={t("Loading")}
              loading={isProjectsFetching}
              required
              fullWidth
            />
            <IconButton onClick={handleRouteNavigate("project")}>
              <EditIcon />
            </IconButton>
          </div>

          <Button className={classes.route} onClick={handleRouteNavigate("board")}>
            {t("Board")}
          </Button>
          <Button className={classes.route} onClick={handleRouteNavigate("backlog")}>
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
      </GlassContainer>
      <div className={classes.outletContainer}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
