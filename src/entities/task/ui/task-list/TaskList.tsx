import { FC } from "react";
import clsx from "clsx";

import { TaskCard, TasksGridItem } from "@/entities/task";
import classes from "./TaskList.module.scss";

type Props = {
  orientation?: "horizontal" | "vertical";
  tasks: TasksGridItem[];
};

const TaskList: FC<Props> = ({ tasks, orientation = "horizontal" }) => {
  return (
    <div className={clsx(classes.tasksContainer, orientation === "vertical" && classes.vertical)}>
      {tasks && tasks.map((task) => <TaskCard key={task.id} {...task} className={classes.task} />)}
    </div>
  );
};
export default TaskList;
