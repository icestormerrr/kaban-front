import React, { FC, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";

import { Task, TaskStatusColorMap } from "src/entities/task";
import { useGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { useGetUserQuery } from "src/entities/user";
import { GlassContainer } from "src/shared/ui";

import classes from "./BoardTask.module.scss";

const BoardTask: FC<Task> = ({ _id, id, name, epicId, sprintId, executorId, stageId, status }) => {
  const navigate = useNavigate();
  const projectId = useProjectId();

  const { data: project } = useGetProjectDetailsQuery({ _id: projectId! });
  const { data: user } = useGetUserQuery({ _id: executorId });

  const epicLabel = useMemo(() => project?.epics?.find((epic) => epic._id === epicId)?.name, [epicId, project?.epics]);
  const sprintLabel = useMemo(
    () => project?.sprints?.find((sprint) => sprint._id === sprintId)?.name,
    [sprintId, project?.sprints],
  );

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
