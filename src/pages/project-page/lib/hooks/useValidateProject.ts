import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ProjectState } from "src/entities/project";

export const useValidateProject = () => {
  const { t } = useTranslation();

  return useCallback((project: ProjectState) => {
    const errors: string[] = [];
    if (!project.name) errors.push(`${t("Field is not filled")}: ${t("Name")}`);
    if (!project.description) errors.push(`${t("Field is not filled")}: ${t("Description")}`);
    if (!project.epics?.length) errors.push(`${t("Add at least one")}: ${t("Epic")}`);
    if (!project.sprints?.length) errors.push(`${t("Add at least one")}: ${t("Sprint")}`);
    if (!project.stages?.length) errors.push(`${t("Add at least one")}: ${t("Stage")}`);
    if (!project.users?.length) errors.push(`${t("Add at least one")}: ${t("Member")}`);
    if (!project.users?.includes(project.authorId!)) errors.push(`${t("Author is not selected as member")}`);
    return errors;
  }, []);
};
