import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { GlassButton } from "@/shared/ui";
import { commonClasses } from "@/shared/styles";
import { useProjectId } from "@/entities/project";

const Operations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projectId = useProjectId();

  const handleTaskCreate = () => {
    navigate(`/project/${projectId}/task`);
  };

  return (
    <Grid item xs={12} className={commonClasses.title}>
      {t("Backlog")}{" "}
      <GlassButton variant="contained" onClick={handleTaskCreate} sx={{ height: "35px", ml: "20px" }}>
        {t("Create task")}
      </GlassButton>
    </Grid>
  );
};

export default Operations;
