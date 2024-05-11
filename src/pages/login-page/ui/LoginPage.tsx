import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "src/shared/ui";

import { ReactComponent as Logo } from "src/widgets/main-layout/assets/logo.svg";
import classes from "./LoginPage.module.scss";
import RegisterContent from "./modules/RegisterContent";
import LoginContent from "./modules/LoginContent";
import Operations from "./modules/Operations";

const LoginPage: FC<NApp.PageProps & { mode: "login" | "register" }> = ({ storeKey, mode }) => {
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <Logo className={classes.logo} />
      <GlassContainer className={classes.form}>
        <div>
          <div className={classes.title}>{mode === "login" ? t("Login") : t("Register")}</div>
          <div className={classes.description}>{t("Welcome back, please, login to your account")}</div>
        </div>
        {mode === "register" && <RegisterContent storeKey={storeKey} />}
        <LoginContent storeKey={storeKey} />
        <Operations storeKey={storeKey} mode={mode} />
      </GlassContainer>
    </div>
  );
};

export default LoginPage;
