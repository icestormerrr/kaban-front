import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { groupBy } from "lodash";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { TasksFilter, useGetTasksGridQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import BoardPanel from "./modules/board-panel/BoardPanel";
import BoardStage from "./modules/board-stage/BoardStage";
import classes from "./BoardPage.module.scss";
import { useSearchParams } from "react-router-dom";

const BoardPage: FC = () => {
  const projectId = useProjectIdFromPath();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    const newFilter: TasksFilter = {};
    searchParams.forEach((value, key) => {
      if (key === "epicId" || key === "sprintId" || key === "executorId") {
        newFilter[key] = value;
      }
    });
    newFilter["projectId"] = projectId;
    return newFilter;
  }, [projectId, searchParams]);

  const handleFilterChange = (prop: string, newVal?: string) => {
    if (newVal) {
      setSearchParams((params) => {
        params.set(prop, newVal);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete(prop);
        return params;
      });
    }
  };

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });

  const { data: tasks = [] } = useGetTasksGridQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const tasksGroupedByStageId = useMemo(() => groupBy(tasks ?? [], (task) => task.stageId), [tasks]);

  return (
    <GlassContainer className={classes.container}>
      <BoardPanel filter={filter} onFilterChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {project &&
          project.stages.map((stage) => (
            <BoardStage stage={stage} tasks={tasksGroupedByStageId[stage._id] ?? []} key={stage._id} />
          ))}
      </GlassContainer>
    </GlassContainer>
  );
};

export default BoardPage;
