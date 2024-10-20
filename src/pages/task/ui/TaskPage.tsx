import { FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorSlice, useSavedState } from "@/shared/store";
import { initialTaskState, TaskState, useLazyGetTaskQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";
import { LAST_VISITED_TASKS_PERSIST_KEY } from "@/entities/task/const/const";
import { useProjectIdFromPath } from "@/entities/project";

import MainFields from "@/pages/task/ui/components/MainFields.tsx";
import Operations from "@/pages/task/ui/components/Operations";
import Comments from "@/pages/task/ui/components/Comments";
import CustomFields from "@/pages/task/ui/components/CustomFields";
import classes from "./TaskPage.module.scss";

const TaskPage: FC<Shared.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const projectId = useProjectIdFromPath();

  const [fetchDetails] = useLazyGetTaskQuery();
  const [, setLastVisitedTasks] = useSavedState<Shared.NamedEntity[]>(
    `${LAST_VISITED_TASKS_PERSIST_KEY}_${projectId}`,
    [],
  );
  const { setEntity: setTask } = useEditorSlice<TaskState>(storeKey);

  const updateLastVisitedTasks = useCallback(
    (newTask: Shared.NamedEntity) => {
      setLastVisitedTasks((oldLastVisitedTasks) => {
        const newLastVisitedTasks = oldLastVisitedTasks.filter((task) => task.id !== newTask.id);
        newLastVisitedTasks.unshift({ id: newTask.id, name: newTask.name });
        if (newLastVisitedTasks.length > 10) newLastVisitedTasks.pop();
        return newLastVisitedTasks;
      });
    },
    [setLastVisitedTasks],
  );

  useEffect(() => {
    if (id && mode === "edit") {
      fetchDetails({ id })
        .unwrap()
        .then((details) => {
          updateLastVisitedTasks(details);
          setTask(details);
        })
        .catch(() => enqueueSnackbar(t("Server error"), { variant: "error" }));
    } else {
      setTask(initialTaskState);
    }
  }, [id, fetchDetails, mode, setTask, t, updateLastVisitedTasks]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container item xs={12} rowSpacing={3}>
        <Operations storeKey={storeKey} mode={mode} />
        <MainFields storeKey={storeKey} />
        <CustomFields storeKey={storeKey} />
        <Comments storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default TaskPage;
