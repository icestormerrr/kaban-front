import React, { FC, ReactNode } from "react";
import { Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmModalProps = {
  children: ReactNode | ReactNode[];
  title: string;
  show: boolean;
  onClose: () => void;
  onOk?: () => void;
  size?: "small" | "medium" | "large";
};
const ConfirmModal: FC<ConfirmModalProps> = ({ children, show, title, onOk, onClose, size }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={show}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(5px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        transition: "all .3s ease-in-out",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size === "medium" ? 800 : size === "large" ? 1200 : 400,
          bgcolor: "background.paper",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "10px",
          boxShadow: 24,
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Benzin", sans-serif' }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {onOk && <Button onClick={onOk}>{t("Ok")}</Button>}
          <Button onClick={onClose}>{t("Cancel")}</Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
