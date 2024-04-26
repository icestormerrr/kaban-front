import React, { FC, memo } from "react";

import { isEqual } from "lodash";

import { TasksGridItem } from "src/entities/task";

import BoardTask from "../board-task/BoardTask";
import classes from "./BoardStage.module.scss";

type Props = {
  stage: NApp.NamedEntity;
  tasks: TasksGridItem[];
};

const BoardStage: FC<Props> = ({ stage, tasks }) => {
  return (
    <div className={classes.stage}>
      <div className={classes.stageTitle}>{stage.name.slice(0, 16)}</div>
      {tasks.map((task) => (
        <BoardTask {...task} key={task._id} />
      ))}
    </div>
  );
};

export default memo(
  BoardStage,
  (prevProps, nextProps) =>
    isEqual(prevProps.stage._id, nextProps.stage._id) && isEqual(nextProps.tasks, prevProps.tasks),
);
