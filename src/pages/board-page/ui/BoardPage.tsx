import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { TasksFilter, useGetTasksQuery } from "src/entities/task";
import { GlassContainer } from "src/shared/ui";

import BoardPanel from "./board-panel/BoardPanel";
import BoardStage from "./board-stage/BoardStage";
import classes from "./BoardPage.module.scss";

const BoardPage: FC = () => {
  const navigate = useNavigate();
  const projectId = useProjectId();
  const [filter, setFilter] = useState<TasksFilter>({ projectId });

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId });
  const { data: tasks = [], isFetching: isTasksFetching } = useGetTasksQuery(filter, {
    refetchOnMountOrArgChange: true,
  });

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
            <BoardStage stage={stage} tasks={tasks.filter((task) => task.stageId === stage._id)} key={stage._id} />
          ))}
      </GlassContainer>
    </GlassContainer>
  );
};

export default BoardPage;
