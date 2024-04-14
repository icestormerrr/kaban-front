import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useGetUsersQuery } from "src/store/users/api";
import { useEditorStore } from "../../hooks/useEditorStore";
import { TasksFilter } from "src/store/tasks/types";
import { ProjectState } from "../../store/projects/types";
import { projectStoreKey } from "../../struct/routes";

import GlassContainer from "../../components/container/glass-container/GlassContainer";
import InputSelect from "../../components/input/InputSelect";

import classes from "./Board.module.scss";

type Props = {
  filter: TasksFilter;
  onChange: (newFilter: Partial<TasksFilter>) => void;
};

export const BoardPanel: FC<Props> = ({ filter, onChange }) => {
  const { t } = useTranslation();

  const { entity: project } = useEditorStore<ProjectState>(projectStoreKey);
  const { name, epics, sprints, users } = useMemo(() => project, [project]);

  const { data: executors } = useGetUsersQuery({ usersIds: users! });

  return (
    <GlassContainer className={classes.panel}>
      <div className={classes.title}>{name}</div>
      <InputSelect
        label={t("Epic")}
        options={epics ?? []}
        value={filter.epicId ?? null}
        className={classes.filter}
        onChange={(epic) => onChange({ epicId: epic?._id })}
      />
      <InputSelect
        label={t("Sprint")}
        options={sprints ?? []}
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
