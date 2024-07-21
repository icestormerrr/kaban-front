import React, { FC } from "react";

import { Chat } from "@/widgets/chat";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { TMessage } from "@/entities/message";
import { TaskState } from "@/entities/task";

import classes from "../TaskPage.module.scss";

type Props = {
  storeKey: string;
};

const Comments: FC<Props> = ({ storeKey }) => {
  const { setEntityProperty: setTaskProperty, getPropertySelector: getTaskPropertySelector } =
    useEditorSlice<TaskState>(storeKey);

  const messages = useAppSelector(getTaskPropertySelector("messages"));
  const handleCommentCreate = (newMessage: TMessage) => {
    setTaskProperty("messages", [...(messages ?? []), newMessage]);
  };

  return <Chat messages={messages ?? []} omMessageCreate={handleCommentCreate} className={classes.commentsContainer} />;
};

export default Comments;
