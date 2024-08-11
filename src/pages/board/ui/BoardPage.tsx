import React, { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { groupBy } from "lodash";

import { useGetProjectDetailsQuery, useProjectIdFromPath } from "@/entities/project";
import { TasksFilter, useGetTasksGridQuery } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import FilterPanel from "./modules/filter-panel/FilterPanel";
import Stage from "./modules/stage/Stage";
import classes from "./BoardPage.module.scss";

const BoardPage: FC = () => {
  const projectId = useProjectIdFromPath();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    const newFilter: TasksFilter = { projectId: projectId! };
    searchParams.forEach((value, key) => {
      newFilter[key] = value;
    });
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
  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! }, { skip: !projectId });

  const { data: tasks = [] } = useGetTasksGridQuery(filter, {
    refetchOnMountOrArgChange: true,
    skip: !projectId,
  });
  const tasksGroupedByStageId = useMemo(() => groupBy(tasks ?? [], (task) => task.stageId), [tasks]);

  return (
    <div className={classes.container}>
      <FilterPanel filter={filter} onFilterChange={handleFilterChange} />
      <GlassContainer className={classes.stageContainer}>
        {project &&
          project.stages.map((stage) => (
            <Stage stage={stage} tasks={tasksGroupedByStageId[stage._id] ?? []} key={stage._id} />
          ))}
      </GlassContainer>
    </div>
  );
};

export default BoardPage;
