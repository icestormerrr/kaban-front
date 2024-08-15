import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip } from "@mui/material";
import clsx from "clsx";

import { TasksGridItem, TaskStatusColorMap } from "@/entities/task";
import { GlassContainer } from "@/shared/ui";

import classes from "./TaskCard.module.scss";
import { useProjectIdFromPath } from "@/entities/project";

const TaskCard: FC<TasksGridItem & { className?: string }> = ({
  id,
  name,
  epicName,
  sprintName,
  executorName,
  status,
  className,
}) => {
  const navigate = useNavigate();
  const projectId = useProjectIdFromPath();

  const handleTaskClick = () => {
    navigate(`/project/${projectId}/task/${id}`);
  };

  return (
    <GlassContainer className={clsx(classes.container, className)} onClick={handleTaskClick}>
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

export default memo(TaskCard);
