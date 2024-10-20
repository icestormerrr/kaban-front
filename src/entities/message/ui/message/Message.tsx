import { FC, memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

import { useGetUserQuery } from "@/entities/user";
import { GlassContainer } from "@/shared/ui";

import { Message as TMessage } from "../../model/types";
import classes from "./Message.module.scss";
import { IconButton } from "@mui/material";

type Props = TMessage & {
  onDelete?: (message: TMessage) => void;
};

const Message: FC<Props> = ({ id, description, date, userId, onDelete }) => {
  const { data: user } = useGetUserQuery({ id: userId });

  return (
    <GlassContainer className={classes.container}>
      <div className={classes.header}>
        <div>
          <span className={classes.user}>{user?.name ?? ""}</span>
          {" - "}
          <span className={classes.date}>{dayjs(date).format("DD.MM.YYYY HH:MM")}</span>
        </div>

        {onDelete && (
          <IconButton onClick={() => onDelete({ id, description, date, userId })}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <div className={classes.description}>{description}</div>
    </GlassContainer>
  );
};

export default memo(Message);
