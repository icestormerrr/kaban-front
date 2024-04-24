import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";

import { GlassButton } from "src/shared/ui";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { useValidateTask } from "../../lib/hooks/useValidateTask";
import { Task, TaskState, useAddTaskMutation, useUpdateTaskMutation } from "src/entities/task";
import { useAppSelector, useEditorStore } from "src/shared/lib";

import classes from "../TaskPage.module.scss";

type Props = {
  storeKey: string;
  mode: NApp.Mode;
};

const Operations: FC<Props> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projectId = useProjectId();
  const validateTask = useValidateTask();

  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const { entitySelector: taskSelector, setEntity: setTask } = useEditorStore<TaskState>(storeKey);

  const task = useAppSelector(taskSelector) ?? {};
  const { data: project, isFetching } = useGetProjectDetailsQuery({ _id: projectId });

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

  return (
    <Grid item xs={12} className={classes.title}>
      {t("Task card")}{" "}
      <GlassButton variant="contained" onClick={handleSave} sx={{ height: "35px", ml: "20px" }}>
        {mode === "edit" ? t("Save") : t("Create")}
      </GlassButton>
    </Grid>
  );
};

export default Operations;
