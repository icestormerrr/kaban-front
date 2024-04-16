import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Button, IconButton, InputAdornment } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useLoginMutation, useRegisterMutation } from "src/pages/login/api/authApi";
import { ACCESS_TOKEN_PERSIST_KEY } from "src/app/config/config";

import GlassContainer from "src/shared/ui/containers/glass-container/GlassContainer";
import InputString from "../../../shared/ui/inputs/InputString";
import { ReactComponent as Logo } from "src/widgets/main-layout/assets/logo.svg";
import classes from "./Login.module.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { USER_PERSIST_KEY } from "../../../entities/user/const/const";

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fetchLogin] = useLoginMutation();
  const [fetchRegister] = useRegisterMutation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((old) => !old);
  };

  const handleSubmit = () => {
    if (email && password) {
      mode === "login" &&
        fetchLogin({ email, password })
          .unwrap()
          .then((data) => {
            localStorage.setItem(USER_PERSIST_KEY, JSON.stringify(data.user));
            localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, data.accessToken);
            navigate("/");
          })
          .catch(console.error);
      mode === "register" &&
        name &&
        fetchRegister({ email, password, name })
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
          <div className={classes.title}>{mode === "login" ? t("Login") : t("Register")}</div>
          <div className={classes.description}>{t("Welcome back, please, login to your account")}</div>
        </div>
        {mode === "register" && <InputString label={t("Name")} value={name} onChange={(newName) => setName(newName)} />}
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
          {mode === "login" ? t("Enter") : t("Sing up")}
        </Button>
        {mode === "login" && (
          <div className={classes.description}>
            {t("Don’t have an account?")}{" "}
            <span className={classes.link} onClick={() => setMode("register")}>
              {t("Sing up")}
            </span>
          </div>
        )}
      </GlassContainer>
    </div>
  );
};

export default Login;
