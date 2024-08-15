import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Settings, Logout } from "@mui/icons-material";
import { MenuItem, ListItemIcon } from "@mui/material";
import { t } from "i18next";

import { AvatarMenu } from "@/shared/ui";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { useLazyGetCurrentUserQuery, useLogoutMutation, UserState } from "@/entities/user";
import { ACCESS_TOKEN_PERSIST_KEY } from "@/shared/const";

const UserMenu = () => {
  const navigate = useNavigate();

  const { entitySelector: userSelector, setEntity: setUser } = useEditorSlice<UserState>("user");
  const user = useAppSelector(userSelector) || {};
  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();

  const [fetchLogout] = useLogoutMutation();
  const isAuth = localStorage.getItem(ACCESS_TOKEN_PERSIST_KEY);

  const handleSettingsNavigate = () => {
    navigate("/settings");
  };

  const handleLogout = useCallback(() => {
    fetchLogout();
    navigate("/login");
  }, [fetchLogout, navigate]);

  useEffect(() => {
    if (!isAuth) handleLogout();
  }, [handleLogout, isAuth, navigate]);

  useEffect(() => {
    fetchCurrentUser()
      .unwrap()
      .then((data) => setUser(data as UserState))
      .catch(console.error);
  }, [fetchCurrentUser, setUser]);

  return (
    <AvatarMenu label={user?.name?.[0] ?? ""}>
      <MenuItem onClick={handleSettingsNavigate}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        {t("Settings")}
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t("Logout")}
      </MenuItem>
    </AvatarMenu>
  );
};
export default UserMenu;
