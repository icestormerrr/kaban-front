import React, { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";

import { TasksGridItem, TaskStatusColorMap } from "src/entities/task";
import { GlassContainer } from "src/shared/ui";

import classes from "./BoardTask.module.scss";

const BoardTask: FC<TasksGridItem> = ({ _id, name, epicName, sprintName, executorName, status }) => {
  const navigate = useNavigate();

  const handleTaskClick = () => {
    navigate(`../task/${_id}`);
  };

  return (
    <GlassContainer className={classes.container} onClick={handleTaskClick}>
      <div className={classes.status} style={{ backgroundColor: TaskStatusColorMap[status] }}></div>
      <div className={classes.title}>{name}</div>
      <Chip className={classes.epic} color="default" label={epicName}></Chip>
      <div className={classes.bottomContainer}>
        <div className={classes.sprint}>{sprintName}</div>
        <Avatar className={classes.executor}>{executorName[0]}</Avatar>
      </div>
    </GlassContainer>
  );
};

export default memo(BoardTask);
