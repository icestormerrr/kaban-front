import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";

import { GlassButton } from "src/shared/ui";
import { AuthResponse, useLoginMutation, useRegisterMutation, UserState } from "src/entities/user";
import { ACCESS_TOKEN_PERSIST_KEY } from "src/shared/const";
import { useAppSelector, useEditorStore } from "src/shared/lib";

import classes from "../LoginPage.module.scss";

const Operations: FC<NApp.PageProps & { mode: "login" | "register" }> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { entitySelector: userSelector, setEntity: setUser } = useEditorStore<UserState>(storeKey);
  const user = useAppSelector(userSelector);

  const handleSuccess = (data: AuthResponse) => {
    enqueueSnackbar(t("You successfully authorized"), { variant: "success" });
    setUser({ ...data.user, password: null });
    localStorage.setItem(ACCESS_TOKEN_PERSIST_KEY, data.accessToken);
    navigate("/");
  };
  const handleError = () => enqueueSnackbar(t("Server error"), { variant: "error" });

  const [fetchLogin] = useLoginMutation();
  const handleLogin = () => {
    if (user.email && user.password)
      fetchLogin({ email: user.email, password: user.password }).unwrap().then(handleSuccess).catch(handleError);
  };

  const [fetchRegister] = useRegisterMutation();
  const handleRegister = () => {
    if (user.email && user.password && user.name)
      fetchRegister({ email: user.email, password: user.password, name: user.name })
        .unwrap()
        .then(handleSuccess)
        .catch(handleError);
  };

  const handleSubmit = () => {
    if (mode == "login") handleLogin();
    if (mode == "register") handleRegister();
  };

  return (
    <>
      <GlassButton variant="contained" onClick={handleSubmit} className={classes.button}>
        {mode == "login" ? t("Enter") : t("Sing up")}
      </GlassButton>
      {mode == "login" && (
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
