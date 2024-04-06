import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Button, IconButton, InputAdornment } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useLoginMutation } from "src/store/auth/api";
import { ACCESS_TOKEN_PERSIST_KEY, USER_PERSIST_KEY } from "src/config";

import GlassContainer from "../../components/container/glass-container/GlassContainer";
import InputString from "../../components/input/InputString";
import { ReactComponent as Logo } from "src/assets/logo.svg";
import classes from "./Login.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fetchLogin] = useLoginMutation();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((old) => !old);
  };

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
      <Logo className={classes.logo} />
      <GlassContainer className={classes.form}>
        <div>
          <div className={classes.title}>{t("Login")}</div>
          <div className={classes.description}>{t("Welcome back, please, login to your account")}</div>
        </div>
        <InputString
          label={t("Login")}
          value={email}
          onChange={(newLogin) => setEmail(newLogin)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <InputString
          type={showPassword ? "text" : "password"}
          label={t("Password")}
          value={password}
          onChange={(newPassword) => setPassword(newPassword)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSubmit} className={classes.button}>
          {t("Enter")}
        </Button>
        <div className={classes.description}>
          {t("Don’t have an account?")} <span className={classes.link}>{t("Sing up")}</span>
        </div>
      </GlassContainer>
    </div>
  );
};

export default Login;
