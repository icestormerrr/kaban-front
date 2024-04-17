import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { TasksFilter, useGetTasksQuery } from "src/entities/task";
import { GlassContainer } from "src/shared/ui";

import BoardPanel from "./BoardPanel";
import BoardStage from "./BoardStage";
import classes from "./BoardPage.module.scss";

const BoardPage: FC = () => {
  const navigate = useNavigate();
  const projectId = useProjectId();

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId });
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

  useEffect(() => {
    if (!projectId) navigate("/home");
  }, [projectId, navigate]);

  return (
    <GlassContainer className={classes.container}>
      <BoardPanel filter={filter} onChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {project &&
          project.stages.map((stage) => (
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

export default BoardPage;
