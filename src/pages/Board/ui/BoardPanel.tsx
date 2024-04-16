import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useGetUsersQuery } from "src/entities/user/api/userApi";
import { TasksFilter } from "src/entities/task/model/types";

import GlassContainer from "src/shared/ui/containers/glass-container/GlassContainer";
import InputSelect from "../../../shared/ui/inputs/InputSelect";

import classes from "./Board.module.scss";
import { useGetProjectDetailsQuery } from "../../../entities/project/api/projectApi";
import { useProjectId } from "../../../entities/project/lib/hooks/useProjectId";
import { skipToken } from "@reduxjs/toolkit/query";

type Props = {
  filter: TasksFilter;
  onChange: (newFilter: Partial<TasksFilter>) => void;
};

export const BoardPanel: FC<Props> = ({ filter, onChange }) => {
  const { t } = useTranslation();
  const projectId = useProjectId();

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId });
  const { data: executors } = useGetUsersQuery({ usersIds: project?.users! }, { skip: !project?.users });

  return (
    <GlassContainer className={classes.panel}>
      <div className={classes.title}>{project?.name}</div>
      <InputSelect
        label={t("Epic")}
        options={project?.epics ?? []}
        value={filter.epicId ?? null}
        className={classes.filter}
        onChange={(epic) => onChange({ epicId: epic?._id })}
      />
      <InputSelect
        label={t("Sprint")}
        options={project?.sprints ?? []}
        value={filter.sprintId ?? null}
        className={classes.filter}
        onChange={(sprint) => onChange({ sprintId: sprint?._id })}
      />
      <InputSelect
        label={t("Executor")}
        options={executors ?? []}
        value={filter.executorId ?? null}
        className={classes.filter}
        onChange={(executor) => onChange({ executorId: executor?._id })}
      />
    </GlassContainer>
  );
};
