import { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";

import Logo from "@/widgets/main-layout/assets/logo.svg?react";
import classes from "./LoginPage.module.scss";
import RegisterFields from "@/pages/login/ui/components/RegisterFields";
import LoginFields from "@/pages/login/ui/components/LoginFields";
import Operations from "@/pages/login/ui/components/Operations";

const LoginPage: FC<Shared.PageProps & { mode: "login" | "register" }> = ({ storeKey, mode }) => {
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
