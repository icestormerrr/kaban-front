import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";

import { GlassContainer } from "@/shared/ui";

import classes from "./HomePage.module.scss";
import { TaskList, useGetCriticalTasksGridQuery, useGetTodayCreatedTasksGridQuery } from "@/entities/task";
import { useProjectIdFromPath } from "@/entities/project";
import { LAST_VISITED_TASKS_PERSIST_KEY } from "@/entities/task/const/const";
import { useSavedState } from "@/shared/store";
import { Link } from "react-router-dom";
import { Chip, Grid } from "@mui/material";

const HomePage: FC = () => {
  const { t } = useTranslation();
  const projectId = useProjectIdFromPath();

  const { data: criticalTasks } = useGetCriticalTasksGridQuery(projectId ? { projectId } : skipToken);
  const { data: recentTasks } = useGetTodayCreatedTasksGridQuery(projectId ? { projectId } : skipToken);

  const [lastVisitedTasks] = useSavedState<Shared.NamedEntity[]>(`${LAST_VISITED_TASKS_PERSIST_KEY}_${projectId}`, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GlassContainer className={clsx(classes.helloContainer, classes.section)}>
          <h2>{t("Welcome to KaBan, have a nice work :3")}</h2>
        </GlassContainer>
      </Grid>
      <Grid item container md={8} xs={12} spacing={2}>
        <Grid item xs={12}>
          {criticalTasks && criticalTasks.length > 0 && (
            <GlassContainer className={classes.section}>
              <h2>{t("Critical tasks")}</h2>
              <TaskList tasks={criticalTasks} />
            </GlassContainer>
          )}
        </Grid>
        <Grid item xs={12}>
          {recentTasks && recentTasks.length > 0 && (
            <GlassContainer className={classes.section}>
              <h2>{t("Recently created tasks")}</h2>
              <TaskList tasks={recentTasks} />
            </GlassContainer>
          )}
        </Grid>
      </Grid>
      <Grid item container md={4} xs={12}>
        {lastVisitedTasks && lastVisitedTasks.length > 0 && (
          <GlassContainer className={classes.section}>
            <h2>{t("Recently visited tasks")}</h2>
            <br />
            {lastVisitedTasks.map((task) => (
              <Link to={`/project/${projectId}/task/${task.id}`}>
                <Chip label={task.name} className={classes.taskChip} />
              </Link>
            ))}
          </GlassContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
