import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";

import { GlassButton } from "@/shared/ui";
import { useLoginMutation, useRegisterMutation, UserState } from "@/entities/user";

import { useAppSelector, useEditorSlice } from "@/shared/store";

import classes from "../LoginPage.module.scss";

const Operations: FC<NApp.PageProps & { mode: "login" | "register" }> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { entitySelector: userSelector } = useEditorSlice<UserState>(storeKey);
  const user = useAppSelector(userSelector);

  const handleSuccess = () => {
    enqueueSnackbar(t("You successfully authorized"), { variant: "success" });
    navigate("/");
  };
  const handleError = () => enqueueSnackbar(t("Server error"), { variant: "error" });

  const [fetchLogin] = useLoginMutation();
  const handleLogin = async () => {
    if (user.email && user.password) {
      const response = await fetchLogin({ email: user.email, password: user.password });
      if ("data" in response) handleSuccess();
      else handleError();
    } else {
      enqueueSnackbar(t("Required field are not filled"), { variant: "success" });
    }
  };

  const [fetchRegister] = useRegisterMutation();
  const handleRegister = async () => {
    if (user.email && user.password && user.name) {
      const response = await fetchRegister({ email: user.email, password: user.password, name: user.name });
      if ("data" in response) handleSuccess();
      else handleError();
    } else {
      enqueueSnackbar(t("Required field are not filled"), { variant: "success" });
    }
  };

  const handleSubmit = () => {
    if (mode === "login") handleLogin();
    if (mode === "register") handleRegister();
  };

  return (
    <>
      <GlassButton variant="contained" onClick={handleSubmit} className={classes.button}>
        {mode === "login" ? t("Enter") : t("Sing up")}
      </GlassButton>
      {mode === "login" && (
        <div className={classes.description}>
          {t("Don’t have an account?")}{" "}
          <span className={classes.link} onClick={() => navigate("/register")}>
            {t("Sing up")}
          </span>
        </div>
      )}
    </>
  );
};

export default Operations;
