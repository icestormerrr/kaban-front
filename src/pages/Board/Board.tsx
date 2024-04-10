import React, { FC, useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppSelector } from "src/hooks/useAppSelector";
import { Task, TasksFilter } from "src/store/tasks/types";
import { useGetTasksQuery } from "src/store/tasks/api";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import { BoardPanel } from "./BoardPanel";
import BoardStage from "./BoardStage";

import classes from "./Board.module.scss";

const Board: FC = () => {
  const { _id: projectId, stages } = useAppSelector((state) => state.project);
  const { data: tasks, isFetching: isTasksFetching } = useGetTasksQuery(projectId ? { projectId } : skipToken);

  const [filter, setFilter] = useState<TasksFilter>({});
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

  const handleFilterChange = (newFilter: Partial<TasksFilter>) => {
    setFilter({ ...filter, ...newFilter });
  };

  return (
    <GlassContainer className={classes.container}>
      <BoardPanel filter={filter} onChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {stages?.map((stage) => (
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
