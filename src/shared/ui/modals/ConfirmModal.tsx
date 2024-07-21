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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size === "medium" ? 800 : size === "large" ? 1200 : 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: '"Benzin", sans-serif' }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
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
