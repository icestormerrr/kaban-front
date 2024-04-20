import React, { FC, memo } from "react";

import dayjs from "dayjs";

import { useGetUserQuery } from "src/entities/user";
import { GlassContainer } from "src/shared/ui";

import { Message as TMessage } from "../../model/types";

import classes from "./Message.module.scss";

type Props = TMessage;

const Message: FC<Props> = ({ description, date, userId }) => {
  const { data: user } = useGetUserQuery({ _id: userId });

  return (
    <GlassContainer className={classes.container}>
      <div>
        <span className={classes.user}>{user?.name ?? ""}</span>
        {" - "}
        <span className={classes.date}>{dayjs(date).format("DD.MM.YYYY HH:MM")}</span>
      </div>
      <div className={classes.description}>{description}</div>
    </GlassContainer>
  );
};

export default memo(Message);
