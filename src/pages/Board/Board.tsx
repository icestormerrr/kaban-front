import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppSelector } from "src/hooks/useAppSelector";
import { useProjectId } from "../../hooks/useProjectId";
import { TasksFilter } from "src/store/tasks/types";
import { useGetTasksQuery } from "src/store/tasks/api";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import { BoardPanel } from "./BoardPanel";
import BoardStage from "./BoardStage";

import classes from "./Board.module.scss";
import { useEditorStore } from "../../hooks/useEditorStore";
import { projectStoreKey } from "../../struct/routes";
import { ProjectState } from "../../store/projects/types";

const Board: FC = () => {
  const projectId = useProjectId();

  const { entity: project } = useEditorStore<ProjectState>(projectStoreKey);

  const { data: tasks, isFetching: isTasksFetching } = useGetTasksQuery(projectId ? { projectId } : skipToken);

  const [filter, setFilter] = useState<TasksFilter>({});
  // TODO: make it on server
  const filteredTasks = useMemo(
    () =>
      tasks?.filter((task) => {
        let res = true;
        if (filter.epicId) res = res && filter.epicId === task.epicId;
        if (filter.sprintId) res = res && filter.sprintId === task.sprintId;
        if (filter.executorId) res = res && filter.executorId === task.executorId;
        return res;
      }) || [],
    [filter, tasks],
  );

  const handleFilterChange = useCallback(
    (newFilter: Partial<TasksFilter>) => {
      setFilter({ ...filter, ...newFilter });
    },
    [filter],
  );

  return (
    <GlassContainer className={classes.container}>
      <BoardPanel filter={filter} onChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {project.stages?.map((stage) => (
          <BoardStage
            stage={stage}
            tasks={filteredTasks.filter((task) => task.stageId === stage._id)}
            key={stage._id}
          />
        ))}
      </GlassContainer>
    </GlassContainer>
  );
};

export default Board;
