import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";

import Logo from "@/widgets/main-layout/assets/logo.svg?react";
import classes from "./LoginPage.module.scss";
import RegisterFields from "./modules/RegisterFields";
import LoginFields from "./modules/LoginFields";
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
        {mode === "register" && <RegisterFields storeKey={storeKey} />}
        <LoginFields storeKey={storeKey} />
        <Operations storeKey={storeKey} mode={mode} />
      </GlassContainer>
    </div>
  );
};

export default LoginPage;
