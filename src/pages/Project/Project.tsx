import React, { FC, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import { useAppSelector } from "src/hooks/useAppSelector";

import { useGetUsersQuery } from "src/store/users/api";
import { useLazyGetProjectDetailsQuery, useUpdateProjectMutation, useAddProjectMutation } from "src/store/projects/api";
import { initialProjectState, setProject, setProjectProperty } from "src/store/projects/slice";
import { ProjectState } from "src/store/projects/types";

import InputString from "src/components/input/InputString";
import InputSelect from "src/components/input/InputSelect";
import InputList from "src/components/input/InputList";
import GlassContainer from "src/components/container/glass-container/GlassContainer";

import classes from "./Project.module.scss";

const Project: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { _id } = useParams();

  const project = useAppSelector((state) => state.project);
  const { name, description, epics, sprints, stages, users, authorId } = project;

  const { data: allUsers } = useGetUsersQuery({});
  const projectUsers = useMemo(() => allUsers?.filter((user) => users?.includes(user._id)), [allUsers, users]);
  const usersAvailibleToAdd = useMemo(
    () => allUsers?.filter((user) => !projectUsers?.find((u) => u._id === user._id)),
    [allUsers, projectUsers],
  );

  const [fetchDetails] = useLazyGetProjectDetailsQuery();
  const [fetchUpdate] = useUpdateProjectMutation();
  const [fetchCreate] = useAddProjectMutation();

  const handleSave = () => {
    const errors = validateProject();
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    if (_id) {
      fetchUpdate(project as any)
        .unwrap()
        .then((details) => dispatch(setProject(details)))
        .catch(console.error);
    } else {
      fetchCreate({ ...project, _id: undefined } as any)
        .unwrap()
        .then((details) => dispatch(setProject(details)))
        .catch(console.error);
    }
    navigate("/boards");
  };

  const handlePropertyChange = <K extends keyof ProjectState>(property: K) => {
    return (value: ProjectState[K]) => dispatch(setProjectProperty({ property: property, value }));
  };

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

  useEffect(() => {
    if (_id) {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => dispatch(setProject(details)))
        .catch(console.error);
    } else {
      dispatch(setProject(initialProjectState));
    }
  }, [_id, dispatch, fetchDetails]);

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
          <Grid item xs={6}>
            <InputList type="input" list={epics ?? []} onListChange={handlePropertyChange("epics")} label={t("Epic")} />
          </Grid>
          <Grid item xs={6}>
            <InputList
              type="input"
              list={sprints ?? []}
              onListChange={handlePropertyChange("sprints")}
              label={t("Sprint")}
            />
          </Grid>
          <Grid item xs={6}>
            <InputList
              type="input"
              list={stages ?? []}
              onListChange={handlePropertyChange("stages")}
              label={t("Stage")}
            />
          </Grid>
          <Grid item xs={6}>
            <InputList
              type="select"
              list={projectUsers ?? []}
              options={usersAvailibleToAdd}
              onListChange={(users) => handlePropertyChange("users")(users.map((user) => user._id))}
              label={t("Member")}
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#fff" }}>
            {t("Save")}
          </Button>
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default Project;
