import React, { FC, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Chip } from "@mui/material";

import { useGetUserQuery } from "src/store/users/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Task } from "src/store/tasks/types";
import { TaskStatusColorMap } from "src/struct/enums";

import GlassContainer from "src/components/container/glass-container/GlassContainer";
import classes from "./BoardTask.module.scss";

const BoardTask: FC<Task> = ({ _id, id, name, epicId, sprintId, executorId, stageId, status }) => {
  const navigate = useNavigate();

  const { epics, sprints } = useAppSelector((state) => state.project);
  const epicLabel = useMemo(() => epics?.find((epic) => epic._id === epicId)?.name, [epicId, epics]);
  const sprintLabel = useMemo(() => sprints?.find((sprint) => sprint._id === sprintId)?.name, [sprintId, sprints]);

  const { data: user } = useGetUserQuery({ _id: executorId });

  const handleTaskClick = () => {
    navigate(`../task/${_id}`);
  };
  return (
    <GlassContainer className={classes.container} onClick={handleTaskClick}>
      <div className={classes.status} style={{ backgroundColor: TaskStatusColorMap[status] }}></div>
      <div className={classes.number}>{id}</div>
      <div className={classes.title}>{name}</div>
      <Chip className={classes.epic} color="default" label={epicLabel}></Chip>
      <div className={classes.bottomContainer}>
        <div className={classes.sprint}>{sprintLabel}</div>
        <Avatar className={classes.executor}>{user?.name[0]}</Avatar>
      </div>
    </GlassContainer>
  );
};

export default memo(BoardTask);
