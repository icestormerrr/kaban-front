import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorSlice } from "@/shared/store";
import { initialTaskState, TaskState, useLazyGetTaskQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import Fields from "./modules/fields/Fields";
import Operations from "./modules/Operations";
import Comments from "./modules/Comments";
import CustomFields from "./modules/CustomFields";
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
      <Grid container item xs={12} rowSpacing={3}>
        <Operations storeKey={storeKey} mode={mode} />
        <Fields storeKey={storeKey} />
        <CustomFields storeKey={storeKey} />
        <Comments storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;
