import React, { FC } from "react";
import { Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";

import { useTranslation } from "react-i18next";

import classes from "./MainLayout.module.scss";

const paperStyles = {
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: "background.paper",
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 0,
  },
};

type Props = {
  label: string;
  onSettingsOpen: () => void;
  onLogoutOpen: () => void;
};

const ProfileMenu: FC<Props> = ({ label, onSettingsOpen, onLogoutOpen }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={t("Profile")}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar className={classes.avatar}>{label}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: paperStyles,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={onSettingsOpen}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t("Settings")}
        </MenuItem>
        <MenuItem onClick={onLogoutOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("Logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
