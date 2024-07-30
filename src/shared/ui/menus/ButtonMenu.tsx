import React, { FC, ReactNode } from "react";
import { Menu, Tooltip, Button, MenuProps } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

type Props = {
  label: string;
  children: ReactNode | ReactNode[];
};

const ButtonMenu: FC<Props> = ({ label, children }) => {
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
        <Button
          id="button-menu"
          aria-controls={open ? "button-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          sx={{
            color: "#fff",
            fontWeight: "normal",
            fontFamily: "'Benzin', sans-serif",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "10px",
          }}
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDown />}
        >
          {label}
        </Button>
      </Tooltip>
      <Menu
        id="button-menu"
        MenuListProps={{
          "aria-labelledby": "button-menu",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default ButtonMenu;
