import React, { FC, useEffect, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import { useEditorStore } from "../../hooks/useEditorStore";
import { useProjectId } from "../../hooks/useProjectId";

import { useGetUsersQuery } from "src/store/users/api";
import { useLazyGetProjectDetailsQuery, useUpdateProjectMutation, useAddProjectMutation } from "src/store/projects/api";
import { ProjectState, initialProjectState } from "src/store/projects/types";

import InputString from "src/components/input/InputString";
import InputSelect from "src/components/input/InputSelect";
import InputList from "src/components/input/InputList";
import GlassContainer from "src/components/container/glass-container/GlassContainer";

import classes from "./Project.module.scss";

const Project: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const _id = useProjectId();

  const {
    entity: project,
    setEntity: setProject,
    setEntityProperty: setProjectProperty,
  } = useEditorStore<ProjectState>(storeKey, initialProjectState);

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
      alert(errors.join("\n"));
      return;
    }
    if (mode === "edit") {
      fetchUpdate(project as any)
        .unwrap()
        .then((details) => setProject(details))
        .catch(() => alert(t("Saving error")));
    } else {
      fetchCreate({ ...project, _id: undefined } as any)
        .unwrap()
        .then((details) => setProject(details))
        .catch(() => alert(t("Saving error")));
    }
  };

  useEffect(() => {
    if (_id && mode === "edit") {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => setProject(details))
        .catch(console.error);
    }
  }, [_id, fetchDetails, mode, setProject]);

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

export default Project;
