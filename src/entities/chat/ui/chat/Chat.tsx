import React, { FC, memo } from "react";
import clsx from "clsx";

import { Message as TMessage } from "../../model/types";
import Message from "../message/Message";
import classes from "./Chat.module.scss";

type Props = {
  messages: TMessage[];
  className?: string;
};

const Chat: FC<Props> = ({ messages, className }) => {
  return (
    <div className={clsx(classes.container, className)}>
      {messages.map((msg) => (
        <Message {...msg} key={msg._id} />
      ))}
    </div>
  );
};

export default memo(Chat);
