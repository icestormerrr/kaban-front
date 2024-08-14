import { skipToken } from "@reduxjs/toolkit/query";
import { useTranslation } from "react-i18next";

import { useProjectIdFromPath } from "@/entities/project";
import { TaskCard, useGetCriticalTasksGridQuery } from "@/entities/task";

import classes from "./CriticalTasks.module.scss";

const CriticalTasks = () => {
  const { t } = useTranslation();

  const projectId = useProjectIdFromPath();
  const { data: tasks } = useGetCriticalTasksGridQuery(projectId ? { projectId } : skipToken);
  return (
    <div>
      <h2>{t("Critical tasks")}</h2>
      <div className={classes.tasksContainer}>
        {tasks && tasks.map((task) => <TaskCard key={task.id} {...task} className={classes.task} />)}
      </div>
    </div>
  );
};
export default CriticalTasks;
