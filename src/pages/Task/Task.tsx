import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Button, Grid } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { useAppSelector } from "src/hooks/useAppSelector";
import { useLazyGetTaskQuery, useUpdateTaskMutation } from "src/store/tasks/api";
import { setTask, setTaskProperty } from "src/store/tasks/slice";
import { TaskState } from "src/store/tasks/types";

import InputString from "src/components/input/InputString";
import GlassContainer from "src/components/container/glass-container/GlassContainer";

import classes from "./Task.module.scss";
import InputSelect from "src/components/input/InputSelect";

const Task: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { _id } = useParams();

  const { epics, sprints, stages } = useAppSelector((state) => state.project);
  const task = useAppSelector((state) => state.task);
  const { name, epicId, sprintId, stageId, status, executorId, description } = task;

  const [fetchDetails] = useLazyGetTaskQuery();
  const [fetchUpdate] = useUpdateTaskMutation();

  const handleReturn = () => {
    navigate("/board");
  };

  const handleSave = () => {
    fetchUpdate(task as any);
    navigate("/board");
  };

  const handlePropertyChange = <K extends keyof TaskState>(property: K) => {
    return (value: TaskState[K]) => dispatch(setTaskProperty({ property: property, value }));
  };

  useEffect(() => {
    _id &&
      fetchDetails({ _id })
        .unwrap()
        .then((details) => dispatch(setTask(details)))
        .catch(console.error);
  }, [_id, dispatch, fetchDetails]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container>
        <Grid container xs={7} spacing={4}>
          <Grid item xs={12}>
            <InputString
              value={name}
              onChange={handlePropertyChange("name")}
              label={t("Name")}
              variant="standard"
              fullWidth
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
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSave}>
              {t("Save")}
            </Button>
          </Grid>
        </Grid>
        <Grid container xs direction="column" justifyContent="flex-start" alignItems="flex-end">
          <InputSelect
            label={t("Stage")}
            options={stages ?? []}
            value={stageId}
            onChange={(s) => handlePropertyChange("stageId")(s?._id ?? null)}
          />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default Task;
