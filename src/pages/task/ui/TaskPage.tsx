import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorSlice } from "@/shared/store";
import { initialTaskState, TaskState, useLazyGetTaskQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import TaskFields from "./modules/TaskFields";
import TaskOperations from "./modules/TaskOperations";
import TaskComments from "./modules/TaskComments";
import TaskCustomFields from "./modules/TaskCustomFields";
import classes from "./TaskPage.module.scss";

const TaskPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const { _id } = useParams();

  const [fetchDetails] = useLazyGetTaskQuery();
  const { setEntity: setTask } = useEditorSlice<TaskState>(storeKey);

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

  return (
    <GlassContainer className={classes.container}>
      <Grid container spacing={4} direction="column" justifyContent="flex-start" alignItems="center">
        <Grid container item xs={12} spacing={2}>
          <TaskOperations storeKey={storeKey} mode={mode} />
          <TaskFields storeKey={storeKey} />
          <TaskCustomFields storeKey={storeKey} />
          <TaskComments storeKey={storeKey} />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;
