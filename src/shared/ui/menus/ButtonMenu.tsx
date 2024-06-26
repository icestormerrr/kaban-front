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
      <StyledMenu
        id="button-menu"
        MenuListProps={{
          "aria-labelledby": "button-menu",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </StyledMenu>
    </>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default ButtonMenu;
