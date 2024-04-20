import React, { FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorStore } from "src/shared/lib";
import { useGetUsersQuery } from "src/entities/user";
import {
  initialProjectState,
  Project,
  ProjectState,
  useAddProjectMutation,
  useLazyGetProjectDetailsQuery,
  useProjectId,
  useUpdateProjectMutation,
} from "../../../entities/project";
import { GlassContainer, InputList, InputSelect, InputString } from "../../../shared/ui";

import classes from "./ProjectPage.module.scss";

const ProjectPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const _id = useProjectId();
  const navigate = useNavigate();

  const {
    entity: project,
    setEntity: setProject,
    setEntityProperty: setProjectProperty,
  } = useEditorStore<ProjectState>(storeKey);

  const { name, description, epics, sprints, stages, users, authorId } = useMemo(() => project, [project]);
  const handlePropertyChange = <K extends keyof ProjectState>(property: K) => {
    return (value: ProjectState[K]) => setProjectProperty(property, value);
  };

  // TODO: rewrite to server search, cause there may be a lot of users
  const { data: allUsers } = useGetUsersQuery({});
  const projectUsers = useMemo(() => allUsers?.filter((user) => users?.includes(user._id)), [allUsers, users]);
  const usersAvailableToAdd = useMemo(
    () => allUsers?.filter((user) => !projectUsers?.find((u) => u._id === user._id)),
    [allUsers, projectUsers],
  );

  const [fetchDetails] = useLazyGetProjectDetailsQuery();
  const [fetchUpdate] = useUpdateProjectMutation();
  const [fetchCreate] = useAddProjectMutation();

  const validateProject = () => {
    const errors = [];
    if (!name) errors.push(`${t("Field is not filled")}: ${t("Name")}`);
    if (!description) errors.push(`${t("Field is not filled")}: ${t("Description")}`);
    if (!epics?.length) errors.push(`${t("Add at least one")}: ${t("Epic")}`);
    if (!sprints?.length) errors.push(`${t("Add at least one")}: ${t("Sprint")}`);
    if (!stages?.length) errors.push(`${t("Add at least one")}: ${t("Stage")}`);
    if (!users?.length) errors.push(`${t("Add at least one")}: ${t("Member")}`);
    return errors;
  };

  const handleSave = () => {
    const errors = validateProject();
    if (errors.length) {
      enqueueSnackbar(errors.join("\n"), { variant: "error" });
      return;
    }
    const queryMethod = mode === "edit" ? fetchUpdate : fetchCreate;
    const queryArg = mode === "edit" ? project : { ...project, _id: undefined };
    queryMethod(queryArg as Project)
      .unwrap()
      .then((details) => {
        setProject(details);
        mode === "create" && navigate(details._id);
        enqueueSnackbar(t("Saved"), { variant: "success" });
      })
      .catch(() => enqueueSnackbar(t("Saving error"), { variant: "error" }));
  };

  useEffect(() => {
    if (_id && mode === "edit") {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => setProject(details))
        .catch(() => enqueueSnackbar(t("Server error"), { variant: "error" }));
    } else {
      setProject(initialProjectState);
    }
  }, [_id, fetchDetails, mode, setProject, t]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Grid container xs spacing={4}>
          <Grid item xs={12}>
            <InputSelect
              disableClearable
              required
              label={t("Author")}
              options={allUsers ?? []}
              value={authorId ?? null}
              onChange={(a) => handlePropertyChange("authorId")(a?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputString value={name} onChange={handlePropertyChange("name")} label={t("Name")} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputString
              value={description}
              onChange={handlePropertyChange("description")}
              label={t("Description")}
              rows={6}
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={1}>
          <Grid item lg={3} xs={6}>
            <InputList type="input" list={epics ?? []} onListChange={handlePropertyChange("epics")} label={t("Epic")} />
          </Grid>
          <Grid item lg={3} xs={6}>
            <InputList
              type="input"
              list={sprints ?? []}
              onListChange={handlePropertyChange("sprints")}
              label={t("Sprint")}
            />
          </Grid>
          <Grid item lg={3} xs={6}>
            <InputList
              type="input"
              list={stages ?? []}
              onListChange={handlePropertyChange("stages")}
              label={t("Stage")}
            />
          </Grid>
          <Grid item lg={3} xs={6}>
            <InputList
              type="select"
              list={projectUsers ?? []}
              options={usersAvailableToAdd}
              onListChange={(users) => handlePropertyChange("users")(users.map((user) => user._id))}
              label={t("Member")}
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#fff" }}>
            {mode === "edit" ? t("Save") : t("Create")}
          </Button>
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default ProjectPage;
