import React, { FC } from "react";

import { Chip } from "@mui/material";

import { Task } from "src/store/tasks/types";

import BoardTask from "./BoardTask";

import classes from "./Board.module.scss";

type Props = {
  stage: NApp.NamedEntity;
  tasks: Task[];
};

const BoardStage: FC<Props> = ({ stage, tasks }) => {
  return (
    <div className={classes.stage}>
      <Chip
        label={stage.name}
        sx={{ width: "100%", mb: 2, minHeight: 40, fontSize: 20 }}
        className={classes.stageTitle}
      />
      {tasks.map((task) => (
        <BoardTask {...task} key={task._id} />
      ))}
    </div>
  );
};

export default BoardStage;
