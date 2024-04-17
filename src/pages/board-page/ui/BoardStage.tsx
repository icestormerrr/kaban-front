import React, { FC } from "react";

import { Task } from "src/entities/task";

import BoardTask from "./BoardTask";
import classes from "./BoardPage.module.scss";

type Props = {
  stage: NApp.NamedEntity;
  tasks: Task[];
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

export default BoardStage;