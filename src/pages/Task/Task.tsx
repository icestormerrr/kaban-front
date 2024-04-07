import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import { useAppSelector } from "src/hooks/useAppSelector";
import { useSavedState } from "src/hooks/useSavedState";

import { PROJECT_ID_PERSIST_KEY } from "src/config";
import { useLazyGetTaskQuery, useUpdateTaskMutation, useAddTaskMutation } from "src/store/tasks/api";
import { useGetUsersQuery } from "src/store/users/api";
import { initialTaskState, setTask, setTaskProperty } from "src/store/tasks/slice";
import { TaskState } from "src/store/tasks/types";
import { TaskStatus, TaskStatusOptions } from "src/struct/enums";

import InputString from "src/components/input/InputString";
import InputSelect from "src/components/input/InputSelect";
import GlassContainer from "src/components/container/glass-container/GlassContainer";

import classes from "./Task.module.scss";

const Task: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { _id } = useParams();

  const [projectId] = useSavedState<string | null>(PROJECT_ID_PERSIST_KEY, null);
  const { epics, sprints, stages, users: usersIds } = useAppSelector((state) => state.project);

  const task = useAppSelector((state) => state.task);
  const { name, epicId, sprintId, stageId, status, executorId, authorId, description } = task;
  const handlePropertyChange = <K extends keyof TaskState>(property: K) => {
    return (value: TaskState[K]) => dispatch(setTaskProperty({ property: property, value }));
  };

  const { data: users } = useGetUsersQuery({ usersIds: usersIds! }, { skip: !usersIds });
  const [fetchDetails] = useLazyGetTaskQuery();
  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const handleSave = () => {
    const errors = validateTask();
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    if (_id) {
      fetchUpdate(task as any)
        .unwrap()
        .then((details) => dispatch(setTask(details)))
        .catch(() => alert("Ошибка сохранения"));
    } else {
      fetchCreate({ ...task, projectId, _id: undefined } as any)
        .unwrap()
        .then((details) => dispatch(setTask(details)))
        .catch(() => alert("Ошибка сохранения"));
    }
    navigate("/board");
  };

  const validateTask = () => {
    const errors = [];
    if (!name) errors.push(`${t("Field is not filled")}: ${t("Name")}`);
    if (!description) errors.push(`${t("Field is not filled")}: ${t("Description")}`);
    if (!epicId) errors.push(`${t("Field is not filled")}: ${t("Epic")}`);
    if (!sprintId) errors.push(`${t("Field is not filled")}: ${t("Sprint")}`);
    if (!stageId) errors.push(`${t("Field is not filled")}: ${t("Stage")}`);
    if (!executorId) errors.push(`${t("Field is not filled")}: ${t("Executor")}`);
    if (!authorId) errors.push(`${t("Field is not filled")}: ${t("Author")}`);
    if (!status) errors.push(`${t("Field is not filled")}: ${t("Status")}`);
    return errors;
  };

  useEffect(() => {
    if (_id) {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => dispatch(setTask(details)))
        .catch(console.error);
    } else {
      dispatch(setTask(initialTaskState));
    }
  }, [_id, dispatch, fetchDetails]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container>
        <Grid container xs={7} spacing={4}>
          <Grid item xs={12}>
            <InputString value={name} onChange={handlePropertyChange("name")} label={t("Name")} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputString
              value={description}
              onChange={handlePropertyChange("description")}
              label={t("Description")}
              rows={10}
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container xs={1}></Grid>
        <Grid container xs>
          <Grid item xs={12}>
            <InputSelect
              disableClearable
              required
              label={t("Stage")}
              options={stages ?? []}
              value={stageId}
              onChange={(s) => handlePropertyChange("stageId")(s?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              disableClearable
              required
              label={t("Status")}
              options={TaskStatusOptions}
              value={status}
              onChange={(s) => handlePropertyChange("status")((s?._id as TaskStatus) ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              disableClearable
              required
              label={t("Executor")}
              options={users ?? []}
              value={executorId ?? null}
              onChange={(e) => handlePropertyChange("executorId")(e?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              disableClearable
              required
              label={t("Author")}
              options={users ?? []}
              value={authorId ?? null}
              onChange={(a) => handlePropertyChange("authorId")(a?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              label={t("Epic")}
              options={epics ?? []}
              value={epicId}
              onChange={(e) => handlePropertyChange("epicId")(e?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              label={t("Sprint")}
              options={sprints ?? []}
              value={sprintId}
              onChange={(s) => handlePropertyChange("sprintId")(s?._id ?? null)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#fff", mt: "32px" }}>
            {t("Save")}
          </Button>
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default Task;
