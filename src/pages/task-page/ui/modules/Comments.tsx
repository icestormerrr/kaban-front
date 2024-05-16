import React, { FC } from "react";

import { Chat } from "src/widgets/chat";
import { useAppSelector, useEditorStore } from "src/shared/lib";
import { TMessage } from "src/entities/message";
import { TaskState } from "src/entities/task";

import classes from "../TaskPage.module.scss";

type Props = {
  storeKey: string;
};

const Comments: FC<Props> = ({ storeKey }) => {
  const { setEntityProperty: setTaskProperty, getPropertySelector: getTaskPropertySelector } =
    useEditorStore<TaskState>(storeKey);

  const messages = useAppSelector(getTaskPropertySelector("messages"));
  const handleCommentCreate = (newMessage: TMessage) => {
    setTaskProperty("messages", [...(messages ?? []), newMessage]);
  };

  return <Chat messages={messages ?? []} omMessageCreate={handleCommentCreate} className={classes.commentsContainer} />;
};

export default Comments;
