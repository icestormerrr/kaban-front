import React, { FC, ReactNode } from "react";
import { Avatar, Menu, IconButton, Tooltip } from "@mui/material";

type Props = {
  label: string;
  children: ReactNode | ReactNode[];
  backgroundColor?: string;
  color?: string;
};

const AvatarMenu: FC<Props> = ({ label, children, backgroundColor = "#fff", color = "#000" }) => {
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
      <Tooltip title={label}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "avatar-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ backgroundColor, color }}>{label}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </>
  );
};

export default AvatarMenu;
