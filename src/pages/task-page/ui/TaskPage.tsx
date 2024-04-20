import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { v4 as uuid } from "uuid";

import { useEditorStore, useSavedState } from "src/shared/lib";
import { useGetUsersQuery, USER_PERSIST_KEY, UserState } from "src/entities/user";
import {
  initialTaskState,
  Task,
  TaskState,
  TaskStatus,
  TaskStatusOptions,
  useAddTaskMutation,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
} from "src/entities/task";
import { Chat } from "src/entities/chat";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { GlassButton, GlassContainer, InputSelect, InputString } from "src/shared/ui";

import { useValidateTask } from "../lib/hooks/useValidateTask";

import classes from "./TaskPage.module.scss";

const TaskPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id } = useParams();
  const projectId = useProjectId();
  const validateTask = useValidateTask();
  const [user] = useSavedState<UserState>(USER_PERSIST_KEY, {} as UserState);
  const [newMessage, setNewMessage] = useState<string | null>(null);

  const { entity: task, setEntity: setTask, setEntityProperty: setTaskProperty } = useEditorStore<TaskState>(storeKey);
  const { name, epicId, sprintId, stageId, status, executorId, authorId, description, messages } = useMemo(
    () => task,
    [task],
  );

  const { data: project, isFetching } = useGetProjectDetailsQuery({ _id: projectId });
  const { data: users } = useGetUsersQuery({ usersIds: project?.users }, { skip: !project?.users });

  const [fetchDetails] = useLazyGetTaskQuery();
  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const handlePropertyChange = <K extends keyof TaskState>(property: K) => {
    return (value: TaskState[K]) => setTaskProperty(property, value);
  };

  const handleCommentCreate = () => {
    newMessage &&
      handlePropertyChange("messages")([
        ...(messages ?? []),
        { description: newMessage, date: Date.now(), userId: user._id, _id: uuid() },
      ]);
  };

  const handleSave = () => {
    const errors = validateTask(task, project ?? null);
    if (errors.length) {
      enqueueSnackbar(errors.join("\n"), { variant: "error" });
      return;
    }
    const queryMethod = mode === "edit" ? fetchUpdate : fetchCreate;
    const queryArg = mode === "edit" ? { ...task, projectId } : { ...task, projectId, _id: undefined };
    queryMethod(queryArg as Task)
      .unwrap()
      .then((details) => {
        setTask(details);
        mode === "create" && navigate(details._id);
        enqueueSnackbar(t("Saved"), { variant: "success" });
      })
      .catch(() => enqueueSnackbar(t("Saving error"), { variant: "error" }));
  };

  useEffect(() => {
    if (_id && mode === "edit") {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => setTask(details))
        .catch(() => enqueueSnackbar(t("Server error"), { variant: "error" }));
    } else {
      setTask(initialTaskState);
    }
  }, [_id, fetchDetails, mode, setTask, t]);

  useEffect(() => {
    if (!projectId) navigate("./home");
  }, [navigate, projectId]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container spacing={4}>
        <Grid container item xs={8} spacing={4}>
          <Grid item xs={12} className={classes.title}>
            {t("Task card")}{" "}
            <GlassButton variant="contained" onClick={handleSave} sx={{ height: "35px", ml: "20px" }}>
              {mode === "edit" ? t("Save") : t("Create")}
            </GlassButton>
          </Grid>
          <Grid item xs={12}>
            <InputString value={name} onChange={handlePropertyChange("name")} label={t("Name")} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputString
              value={description}
              onChange={handlePropertyChange("description")}
              label={t("Description")}
              rows={20}
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              disableClearable
              required
              label={t("Stage")}
              options={project?.stages ?? []}
              value={stageId}
              onChange={(s) => handlePropertyChange("stageId")(s?._id ?? null)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              disableClearable
              required
              label={t("Executor")}
              options={users ?? []}
              value={executorId ?? null}
              onChange={(e) => handlePropertyChange("executorId")(e?._id ?? null)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              label={t("Epic")}
              options={project?.epics ?? []}
              value={epicId}
              onChange={(e) => handlePropertyChange("epicId")(e?._id ?? null)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              disableClearable
              required
              label={t("Status")}
              options={TaskStatusOptions}
              value={status}
              onChange={(s) => handlePropertyChange("status")((s?._id as TaskStatus) ?? null)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              disableClearable
              required
              label={t("Author")}
              options={users ?? []}
              value={authorId ?? null}
              onChange={(a) => handlePropertyChange("authorId")(a?._id ?? null)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputSelect
              label={t("Sprint")}
              options={project?.sprints ?? []}
              value={sprintId}
              onChange={(s) => handlePropertyChange("sprintId")(s?._id ?? null)}
            />
          </Grid>
        </Grid>
        <Grid container item xs={4} spacing={4} display="flex" flexDirection="column" justifyContent="flex-start">
          <Grid item className={classes.title}>
            {t("Comments")}{" "}
            <GlassButton variant="contained" onClick={handleCommentCreate} sx={{ height: "35px", ml: "20px" }}>
              {t("Add")}
            </GlassButton>
          </Grid>
          <Grid container item>
            <Grid item xs>
              <InputString
                value={newMessage}
                onChange={(newMessage) => setNewMessage(newMessage)}
                label={t("Comment")}
                rows={3}
                multiline
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item>
            <Chat messages={messages ?? []} className={classes.commentsContainer} />
          </Grid>
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;
