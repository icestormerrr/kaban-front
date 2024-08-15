import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import { Chat } from "@/widgets/chat";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { TMessage } from "@/entities/message";
import { TaskState } from "@/entities/task";

import classes from "../TaskPage.module.scss";
import { UserState } from "@/entities/user";

type Props = {
  storeKey: string;
};

const Comments: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();
  const { setEntityProperty: setTaskProperty, getPropertySelector: getTaskPropertySelector } =
    useEditorSlice<TaskState>(storeKey);

  const { entitySelector: userSelector } = useEditorSlice<UserState>("user");
  const user = useAppSelector(userSelector);

  const messages = useAppSelector(getTaskPropertySelector("messages"));

  const handleCommentCreate = (newMessage: TMessage) => {
    setTaskProperty("messages", [newMessage, ...(messages ?? [])]);
  };

  const handleCommentDelete = (message: TMessage) => {
    setTaskProperty(
      "messages",
      (messages ?? []).filter((m) => m.date !== message.date),
    );
  };

  const canDeleteMessage = ({ userId, date }: TMessage) => user.id === userId && date == messages?.[0].date;

  return (
    <Grid container item xs={12} spacing={4} display="flex" flexDirection="column" justifyContent="flex-start">
      <Chat
        title={t("Comments")}
        messages={messages ?? []}
        onMessageCreate={handleCommentCreate}
        onMessageDelete={handleCommentDelete}
        canDeleteMessage={canDeleteMessage}
        className={classes.commentsContainer}
      />
    </Grid>
  );
};

export default Comments;
