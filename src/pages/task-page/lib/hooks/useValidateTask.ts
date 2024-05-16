import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { TaskState } from "@/entities/task";
import { ProjectState } from "@/entities/project";

export const useValidateTask = () => {
  const { t } = useTranslation();
  return useCallback((task: TaskState, project: ProjectState | null) => {
    if (!project) return [t("Server error")];
    const errors: string[] = [];
    if (!task.name) errors.push(`${t("Field is not filled")}: ${t("Name")}`);
    if (!task.description) errors.push(`${t("Field is not filled")}: ${t("Description")}`);
    if (!task.epicId || !project.epics?.find((e) => e._id === task.epicId))
      errors.push(`${t("Field is not filled")}: ${t("Epic")}`);
    if (!task.sprintId || !project.sprints?.find((s) => s._id === task.sprintId))
      errors.push(`${t("Field is not filled")}: ${t("Sprint")}`);
    if (!task.stageId || !project.stages?.find((s) => s._id === task.stageId))
      errors.push(`${t("Field is not filled")}: ${t("Stage")}`);
    if (!task.executorId || !project.users?.find((userId) => userId === task.executorId))
      errors.push(`${t("Field is not filled")}: ${t("Executor")}`);
    if (!task.authorId || !project.users?.find((userId) => userId === task.authorId))
      errors.push(`${t("Field is not filled")}: ${t("Author")}`);
    if (!task.status) errors.push(`${t("Field is not filled")}: ${t("Status")}`);
    return errors;
  }, []);
};
