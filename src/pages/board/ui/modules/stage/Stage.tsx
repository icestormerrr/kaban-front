import React, { FC, memo } from "react";

import { isEqual } from "lodash";

import { TasksGridItem } from "@/entities/task";

import TaskCard from "../task-card/TaskCard";
import classes from "./Stage.module.scss";

type Props = {
  stage: NApp.NamedEntity;
  tasks: TasksGridItem[];
};

const Stage: FC<Props> = ({ stage, tasks }) => {
  return (
    <div className={classes.stage}>
      <div className={classes.stageTitle}>{stage.name.slice(0, 16)}</div>
      {tasks.map((task) => (
        <TaskCard {...task} key={task._id} />
      ))}
    </div>
  );
};

export default memo(
  Stage,
  (prevProps, nextProps) =>
    isEqual(prevProps.stage._id, nextProps.stage._id) && isEqual(nextProps.tasks, prevProps.tasks),
);
