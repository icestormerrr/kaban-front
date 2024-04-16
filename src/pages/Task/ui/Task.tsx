import React, { FC, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";

import { useEditorStore } from "../../../shared/lib/hooks/useEditorStore";
import { useProjectId } from "../../../entities/project/lib/hooks/useProjectId";

import { useLazyGetTaskQuery, useUpdateTaskMutation, useAddTaskMutation } from "src/entities/task/api/taskApi";
import { useGetProjectDetailsQuery } from "../../../entities/project/api/projectApi";
import { useGetUsersQuery } from "src/entities/user/api/userApi";
import { TaskState, initialTaskState } from "src/entities/task/model/types";
import { TaskStatus, TaskStatusOptions } from "src/entities/task/model/enums";

import InputString from "src/shared/ui/inputs/InputString";
import InputSelect from "src/shared/ui/inputs/InputSelect";
import GlassContainer from "src/shared/ui/containers/glass-container/GlassContainer";

import classes from "./Task.module.scss";

const Task: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id } = useParams();
  const projectId = useProjectId();

  const {
    entity: task,
    setEntity: setTask,
    setEntityProperty: setTaskProperty,
  } = useEditorStore<TaskState>(storeKey, initialTaskState);
  const { name, epicId, sprintId, stageId, status, executorId, authorId, description } = useMemo(() => task, [task]);

  const { data: project, isFetching } = useGetProjectDetailsQuery({ _id: projectId });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  const handlePropertyChange = <K extends keyof TaskState>(property: K) => {
    return (value: TaskState[K]) => setTaskProperty(property, value);
  };

  const [fetchDetails] = useLazyGetTaskQuery();
  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const validateTask = () => {
    const errors = [];
    if (!name) errors.push(`${t("Field is not filled")}: ${t("Name")}`);
    if (!description) errors.push(`${t("Field is not filled")}: ${t("Description")}`);
    if (!epicId || !project?.epics?.find((e) => e._id === epicId))
      errors.push(`${t("Field is not filled")}: ${t("Epic")}`);
    if (!sprintId || !project?.sprints?.find((s) => s._id === sprintId))
      errors.push(`${t("Field is not filled")}: ${t("Sprint")}`);
    if (!stageId || !project?.stages?.find((s) => s._id === stageId))
      errors.push(`${t("Field is not filled")}: ${t("Stage")}`);
    if (!executorId || !users?.find((s) => s._id === executorId))
      errors.push(`${t("Field is not filled")}: ${t("Executor")}`);
    if (!authorId || !users?.find((s) => s._id === authorId))
      errors.push(`${t("Field is not filled")}: ${t("Author")}`);
    if (!status) errors.push(`${t("Field is not filled")}: ${t("Status")}`);
    return errors;
  };

  const handleSave = () => {
    const errors = validateTask();
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    if (mode === "edit") {
      fetchUpdate(task as any)
        .unwrap()
        .then((details) => setTask(details))
        .catch(() => alert(t("Saving error")));
    } else {
      fetchCreate({ ...task, projectId, _id: undefined } as any)
        .unwrap()
        .then((details) => navigate(`${details._id}`))
        .catch(() => alert(t("Saving error")));
    }
  };

  useEffect(() => {
    if (_id && mode === "edit") {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => setTask(details))
        .catch(() => alert(t("Server error")));
    }
  }, [_id, fetchDetails, mode, setTask, t]);

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
              options={project?.stages ?? []}
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
              options={project?.epics ?? []}
              value={epicId}
              onChange={(e) => handlePropertyChange("epicId")(e?._id ?? null)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputSelect
              label={t("Sprint")}
              options={project?.sprints ?? []}
              value={sprintId}
              onChange={(s) => handlePropertyChange("sprintId")(s?._id ?? null)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#fff", mt: "32px" }}>
            {mode === "edit" ? t("Save") : t("Create")}
          </Button>
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default Task;
