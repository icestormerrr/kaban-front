import React, { FC, memo, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";
import { Grid } from "@mui/material";

import { GlassButton, InputString } from "src/shared/ui";
import { useSavedState } from "src/shared/lib";
import { USER_PERSIST_KEY, UserState } from "src/entities/user";

import { Message as TMessage } from "src/entities/message";
import Message from "../message/Message";
import classes from "./Chat.module.scss";

type Props = {
  messages: TMessage[];
  omMessageCreate: (message: TMessage) => void;
  className?: string;
};

const Chat: FC<Props> = ({ messages, omMessageCreate, className }) => {
  const { t } = useTranslation();

  const [user] = useSavedState<UserState>(USER_PERSIST_KEY, {} as UserState);
  const [newMessage, setNewMessage] = useState<string | null>(null);

  const handleMessageCreate = () => {
    omMessageCreate({ description: newMessage!, date: Date.now(), userId: user._id, _id: uuid() });
  };

  return (
    <>
      <Grid item className={classes.title}>
        {t("Comments")}{" "}
        <GlassButton
          variant="contained"
          onClick={handleMessageCreate}
          sx={{ height: "35px", ml: "20px" }}
          disabled={!newMessage}
        >
          {t("Add")}
        </GlassButton>
      </Grid>
      <Grid container item>
        <Grid item xs>
          <InputString
            value={newMessage}
            onChange={(newMessage) => setNewMessage(newMessage)}
            label={t("Comment")}
            rows={3}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item>
        <div className={clsx(classes.container, className)}>
          {messages.map((msg) => (
            <Message {...msg} key={msg._id} />
          ))}
        </div>
      </Grid>
    </>
  );
};

export default memo(Chat);