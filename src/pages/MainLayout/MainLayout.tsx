import React, { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSavedState } from "../../hooks/useSavedState";
import { useAuth } from "src/hooks/useAuth";

import { useGetProjectsQuery, useLazyGetProjectDetailsQuery } from "src/store/projects/api";
import { setProject } from "../../store/projects/slice";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import InputSelect from "src/components/input/InputSelect";
import { ReactComponent as Logo } from "src/assets/logo.svg";

import classes from "./MainLayout.module.scss";
import { useAppSelector } from "src/hooks/useAppSelector";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isAuth = useAuth();
  const { t } = useTranslation();

  const { data: projects = [], isFetching: isProjectsFetching } = useGetProjectsQuery();
  const [fetchProject] = useLazyGetProjectDetailsQuery();

  const user = useAppSelector((state) => state.user);
  const [selectedProjectId, setSelectedProjectId] = useSavedState<string | undefined>("projectId", undefined);

  const handleHomeNavigate = () => {
    navigate("/");
  };

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
      <GlassContainer className={classes.container}>
        <div className={classes.leftContainer}>
          <Logo onClick={handleHomeNavigate} style={{ cursor: "pointer" }} />
          <InputSelect
            disableClearable
            className={classes.project}
            value={selectedProjectId ?? null}
            options={projects}
            onChange={handleProjectChange}
            label={t("Project")}
            loadingText={t("Loading")}
            loading={isProjectsFetching}
          />
          <div className={classes.route} style={{ color: pathname?.includes("board") ? "#4169e1" : "#fff" }}>
            {t("Board")}
          </div>
          <div className={classes.route} style={{ color: pathname?.includes("project") ? "#4169e1" : "#fff" }}>
            {t("Project")}
          </div>
          <div className={classes.route} style={{ color: pathname?.includes("tasks") ? "#4169e1" : "#fff" }}>
            {t("Tasks")}
          </div>
        </div>
        <Avatar>{user.name}</Avatar>
      </GlassContainer>
      <Outlet />
    </>
  );
};

export default MainLayout;
