import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useAppSelector, useEditorStore } from "src/shared/lib";
import {
  initialTaskState,
  Task,
  TaskState,
  useAddTaskMutation,
  useLazyGetTaskQuery,
  useUpdateTaskMutation,
} from "src/entities/task";
import { Chat } from "src/widgets/chat";
import { TMessage } from "src/entities/message";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { GlassButton, GlassContainer } from "src/shared/ui";

import { useValidateTask } from "../lib/hooks/useValidateTask";
import Content from "./content/Content";
import classes from "./TaskPage.module.scss";

const TaskPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id } = useParams();
  const projectId = useProjectId();
  const validateTask = useValidateTask();

  const [fetchDetails] = useLazyGetTaskQuery();
  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const {
    entitySelector: taskSelector,
    setEntity: setTask,
    setEntityProperty: setTaskProperty,
    getEntityPropertySelector: getTaskPropertySelector,
  } = useEditorStore<TaskState>(storeKey);

  const task = useAppSelector(taskSelector) ?? {};
  const { data: project, isFetching } = useGetProjectDetailsQuery({ _id: projectId });

  const messages = useAppSelector(getTaskPropertySelector("messages"));
  const handleCommentCreate = (newMessage: TMessage) => {
    setTaskProperty("messages", [...(messages ?? []), newMessage]);
  };

  const handleSave = () => {
    const errors = validateTask(task, project ?? null);
    if (errors.length) {
      enqueueSnackbar(errors.join("\n"), { variant: "error", autoHideDuration: 10000 });
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
          <Content storeKey={storeKey} />
        </Grid>
        <Grid container item xs={4} spacing={4} display="flex" flexDirection="column" justifyContent="flex-start">
          <Chat messages={messages ?? []} omMessageCreate={handleCommentCreate} className={classes.commentsContainer} />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;
