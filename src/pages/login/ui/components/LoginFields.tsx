import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, InputAdornment } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useAppSelector, useEditorSlice } from "@/shared/store";
import { UserState } from "@/entities/user";
import { InputString } from "@/shared/ui";

const LoginFields: FC<Shared.PageProps> = ({ storeKey }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const { entitySelector: userSelector, setEntityProperty: setUserProperty } = useEditorSlice<UserState>(storeKey);
  const { email, password } = useAppSelector(userSelector) || {};

  return (
    <>
      <InputString
        label={t("Login")}
        value={email}
        onChange={(newLogin) => setUserProperty("email", newLogin)}
        showBorder
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
        onChange={(newPassword) => setUserProperty("password", newPassword)}
        showBorder
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((old) => !old)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default LoginFields;
