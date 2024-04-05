import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { useLoginMutation } from "src/store/auth/api";
import { ACCESS_TOKEN_PERSIST_KEY, USER_PERSIST_KEY } from "src/config";

import GlassContainer from "../../components/container/glass-container/GlassContainer";
import InputString from "../../components/input/InputString";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import classes from "./Login.module.scss";

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fetchLogin] = useLoginMutation();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleSubmit = () => {
    if (email && password) {
      fetchLogin({ email, password })
        .unwrap()
        .then((data) => {
          localStorage.setItem(USER_PERSIST_KEY, JSON.stringify(data.user));
          localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, data.accessToken);
          navigate("/");
        })
        .catch(console.error);
    }
  };

  return (
    <div className={classes.container}>
      <GlassContainer className={classes.form}>
        <Logo style={{ margin: "0 auto" }} />
        <InputString label={t("Login")} value={email} onChange={(newLogin) => setEmail(newLogin)} />
        <InputString
          type="password"
          label={t("Password")}
          value={password}
          onChange={(newPassword) => setPassword(newPassword)}
        />
        <Button variant="contained" onClick={handleSubmit} style={{ backgroundColor: "#fff" }}>
          {t("Enter")}
        </Button>
      </GlassContainer>
    </div>
  );
};

export default Login;
