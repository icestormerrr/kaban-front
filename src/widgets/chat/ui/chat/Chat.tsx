import { FC, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { GlassButton, InputString } from "@/shared/ui";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { User } from "@/entities/user";

import { TMessage, Message } from "@/entities/message";
import classes from "./Chat.module.scss";

type Props = {
  title: string;
  messages: TMessage[];
  onMessageCreate: (message: TMessage) => void;
  onMessageDelete?: (message: TMessage) => void;
  canDeleteMessage?: (message: TMessage) => boolean;
  className?: string;
};

const Chat: FC<Props> = ({ title, messages, onMessageCreate, onMessageDelete, canDeleteMessage, className }) => {
  const { t } = useTranslation();

  const { entitySelector: userSelector } = useEditorSlice<User>("user");
  const user = useAppSelector(userSelector) || {};

  const [newMessage, setNewMessage] = useState<string | null>(null);

  const handleMessageCreate = () => {
    onMessageCreate({ description: newMessage!, date: Date.now(), userId: user.id, id: uuid() });
    setNewMessage("");
  };
  const handleMessageDelete = (message: TMessage) => {
    if (onMessageDelete) {
      onMessageDelete(message);
    }
  };

  return (
    <>
      <Grid item>
        <h2>{title}</h2>
        <GlassButton
          variant="contained"
          onClick={handleMessageCreate}
          sx={{ height: "35px", ml: "20px" }}
          disabled={!newMessage}
        >
          <AddIcon />
        </GlassButton>
      </Grid>
      <Grid container item>
        <Grid item xs>
          <InputString
            value={newMessage}
            onChange={(newMessage) => setNewMessage(newMessage)}
            label={t("Comment")}
            multiline
            showBorder
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item>
        <div className={clsx(classes.container, className)}>
          {messages.map((msg) => (
            <Message
              {...msg}
              key={msg.id}
              onDelete={
                canDeleteMessage ? (canDeleteMessage(msg) ? handleMessageDelete : undefined) : handleMessageDelete
              }
            />
          ))}
        </div>
      </Grid>
    </>
  );
};

export default Chat;
