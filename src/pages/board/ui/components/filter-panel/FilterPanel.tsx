import { FC, memo } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { useGetUsersQuery } from "@/entities/user";
import { TasksFilter } from "@/entities/task";
import { GlassContainer, InputSelect, InputString } from "@/shared/ui";

import classes from "./FilterPanel.module.scss";
import { skipToken } from "@reduxjs/toolkit/query";

type Props = {
  filter: TasksFilter;
  onFilterChange(prop: string, newVal?: string): void;
};

const FilterPanel: FC<Props> = ({ filter, onFilterChange }) => {
  const { t } = useTranslation();
  const projectId = useProjectIdFromPath();

  const { data: project } = useGetProjectDetailsQuery({ id: projectId! });
  const { data: executors } = useGetUsersQuery(project?.users ? { usersIds: project.users } : skipToken);

  return (
    <GlassContainer className={classes.panel}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <InputString
            label={t("Name")}
            value={filter.name ?? null}
            className={classes.filter}
            onChange={(name) => onFilterChange("name", name ?? undefined)}
            showBorder
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <InputSelect
            label={t("Epic")}
            options={project?.epics ?? []}
            value={filter.epicId ?? null}
            className={classes.filter}
            onChange={(epic) => onFilterChange("epicId", epic?.id)}
            showBorder
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <InputSelect
            label={t("Sprint")}
            options={project?.sprints ?? []}
            value={filter.sprintId ?? null}
            className={classes.filter}
            onChange={(sprint) => onFilterChange("sprintId", sprint?.id)}
            showBorder
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <InputSelect
            label={t("Executor")}
            options={executors ?? []}
            value={filter.executorId ?? null}
            className={classes.filter}
            onChange={(executor) => onFilterChange("executorId", executor?.id)}
            showBorder
          />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default memo(FilterPanel);
