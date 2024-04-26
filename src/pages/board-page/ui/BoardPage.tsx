import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupBy } from "lodash";

import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { TasksFilter, useGetTasksGridQuery } from "src/entities/task";
import { GlassContainer } from "src/shared/ui";

import BoardPanel from "./board-panel/BoardPanel";
import BoardStage from "./board-stage/BoardStage";
import classes from "./BoardPage.module.scss";

const BoardPage: FC = () => {
  const navigate = useNavigate();
  const projectId = useProjectId();
  const [filter, setFilter] = useState<TasksFilter>({ projectId });
  const handleFilterChange = useCallback(
    (newFilter: Partial<TasksFilter>) => {
      setFilter({ ...filter, ...newFilter });
    },
    [filter],
  );

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: tasks = [], isFetching: isTasksFetching } = useGetTasksGridQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const tasksGoupedByStageId = useMemo(() => groupBy(tasks ?? [], (task) => task.stageId), [tasks]);

  return (
    <GlassContainer className={classes.container}>
      <BoardPanel filter={filter} onChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {project &&
          project.stages.map((stage) => (
            <BoardStage stage={stage} tasks={tasksGoupedByStageId[stage._id] ?? []} key={stage._id} />
          ))}
      </GlassContainer>
    </GlassContainer>
  );
};

export default BoardPage;
