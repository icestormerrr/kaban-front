import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorSlice } from "@/shared/store";
import { initialTaskState, TaskState, useLazyGetTaskQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import Content from "./modules/Content";
import Operations from "./modules/Operations";
import Comments from "./modules/Comments";
import CustomFieldsContent from "./modules/CustomFieldsContent";
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
      <Grid container spacing={4}>
        <Grid container item md={8} xs={12} spacing={4}>
          <Operations storeKey={storeKey} mode={mode} />
          <Content storeKey={storeKey} />
          <CustomFieldsContent storeKey={storeKey} />
        </Grid>
        <Grid
          container
          item
          md={4}
          xs={12}
          spacing={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
        >
          <Comments storeKey={storeKey} />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;