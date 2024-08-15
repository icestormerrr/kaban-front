import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";

import classes from "./HomePage.module.scss";
import { TaskList, useGetCriticalTasksGridQuery, useGetTodayCreatedTasksGridQuery } from "@/entities/task";
import { useProjectIdFromPath } from "@/entities/project";
import { skipToken } from "@reduxjs/toolkit/query";

const HomePage: FC = () => {
  const { t } = useTranslation();
  const projectId = useProjectIdFromPath();
  const { data: criticalTasks } = useGetCriticalTasksGridQuery(projectId ? { projectId } : skipToken);
  const { data: recentTasks } = useGetTodayCreatedTasksGridQuery(projectId ? { projectId } : skipToken);

  return (
    <div>
      <GlassContainer className={clsx(classes.helloContainer, classes.section)}>
        <h2>{t("Welcome to KaBan, have a nice work :3")}</h2>
      </GlassContainer>
      {criticalTasks && criticalTasks.length > 0 && (
        <GlassContainer className={classes.section}>
          <h2>{t("Critical tasks")}</h2>
          <TaskList tasks={criticalTasks} />
        </GlassContainer>
      )}
      {recentTasks && recentTasks.length > 0 && (
        <GlassContainer className={classes.section}>
          <h2>{t("Recent tasks")}</h2>
          <TaskList tasks={recentTasks} />
        </GlassContainer>
      )}
    </div>
  );
};

export default HomePage;
