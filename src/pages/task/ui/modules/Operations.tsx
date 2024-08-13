import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { compact } from "lodash";

import { FieldString, GlassButton } from "@/shared/ui";
import { useProjectIdFromPath } from "@/entities/project";
import { Task, TaskState, useAddTaskMutation, useUpdateTaskMutation } from "@/entities/task";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import classes from "../TaskPage.module.scss";

type Props = {
  storeKey: string;
  mode: Shared.Mode;
};

const Operations: FC<Props> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projectId = useProjectIdFromPath();

  const [fetchUpdate] = useUpdateTaskMutation();
  const [fetchCreate] = useAddTaskMutation();

  const { entitySelector: taskSelector, setEntity: setTask } = useEditorSlice<TaskState>(storeKey);
  const task = useAppSelector(taskSelector) ?? {};

  const validateTask = useCallback((task: TaskState) => {
    const errors: string[] = compact([
      (!task.name ||
        !task.description ||
        !task.epicId ||
        !task.sprintId ||
        !task.stageId ||
        !task.executorId ||
        !task.authorId ||
        !task.status) &&
        "Required field are not filled",
    ]);
    return errors;
  }, []);

  const handleSave = () => {
    const errors = validateTask(task);
    if (errors.length) {
      enqueueSnackbar(errors.map((err) => t(err)).join(";   "), {
        variant: "error",
        autoHideDuration: 5000,
      });
      return;
    }
    const queryMethod = mode === "edit" ? fetchUpdate : fetchCreate;
    const queryArg = mode === "edit" ? { ...task, projectId } : { ...task, projectId, _id: undefined };
    queryMethod(queryArg as Task)
      .unwrap()
      .then((details) => {
        setTask(details);
        if (mode === "create") navigate(details._id);
        enqueueSnackbar(t("Saved"), { variant: "success" });
      })
      .catch(() => enqueueSnackbar(t("Saving error"), { variant: "error" }));
  };

  return (
    <Grid container item xs={12}>
      <FieldString
        storeKey={storeKey}
        property="name"
        className={classes.nameField}
        required
        style={{
          flex: "1",
          "& .MuiInputBase-input": {
            padding: 0,
          },
          "& .MuiInputBase-root": {
            fontFamily: "Benzin",
            fontSize: "25px",
          },
        }}
      />
      <GlassButton variant="contained" onClick={handleSave} sx={{ height: "35px" }}>
        <SaveIcon />
      </GlassButton>
    </Grid>
  );
};

export default Operations;
