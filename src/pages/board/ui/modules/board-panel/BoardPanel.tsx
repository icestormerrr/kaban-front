import React, { FC, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";
import { TasksFilter } from "@/entities/task";
import { GlassContainer, InputSelect } from "@/shared/ui";

import classes from "./BoardPanel.module.scss";

type Props = {
  filter: TasksFilter;
  onFilterChange(prop: string, newVal?: string): void;
};

const BoardPanel: FC<Props> = ({ filter, onFilterChange }) => {
  const { t } = useTranslation();
  const projectId = useProjectIdFromPath();

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: executors } = useGetUsersQuery({ usersIds: project?.users! }, { skip: !project?.users });

  return (
    <GlassContainer className={classes.panel}>
      <div className={classes.title}>{project?.name}</div>
      <InputSelect
        label={t("Epic")}
        options={project?.epics ?? []}
        value={filter.epicId ?? null}
        className={classes.filter}
        onChange={(epic) => onFilterChange("epicId", epic?._id)}
      />
      <InputSelect
        label={t("Sprint")}
        options={project?.sprints ?? []}
        value={filter.sprintId ?? null}
        className={classes.filter}
        onChange={(sprint) => onFilterChange("sprintId", sprint?._id)}
      />
      <InputSelect
        label={t("Executor")}
        options={executors ?? []}
        value={filter.executorId ?? null}
        className={classes.filter}
        onChange={(executor) => onFilterChange("executorId", executor?._id)}
      />
    </GlassContainer>
  );
};

export default memo(BoardPanel);
