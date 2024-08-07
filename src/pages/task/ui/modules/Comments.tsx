import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import { Chat } from "@/widgets/chat";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { TMessage } from "@/entities/message";
import { TaskState } from "@/entities/task";

import classes from "../TaskPage.module.scss";

type Props = {
  storeKey: string;
};

const Comments: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();
  const { setEntityProperty: setTaskProperty, getPropertySelector: getTaskPropertySelector } =
    useEditorSlice<TaskState>(storeKey);

  const messages = useAppSelector(getTaskPropertySelector("messages"));
  const handleCommentCreate = (newMessage: TMessage) => {
    setTaskProperty("messages", [...(messages ?? []), newMessage]);
  };

  return (
    <Grid container item xs={12} spacing={4} display="flex" flexDirection="column" justifyContent="flex-start">
      <Chat
        title={t("Comments")}
        messages={messages ?? []}
        omMessageCreate={handleCommentCreate}
        className={classes.commentsContainer}
      />
    </Grid>
  );
};

export default Comments;
