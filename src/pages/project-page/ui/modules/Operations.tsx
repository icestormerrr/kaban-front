import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "src/shared/ui";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";

import { Project, ProjectState, useAddProjectMutation, useUpdateProjectMutation } from "src/entities/project";
import { useAppSelector, useEditorStore } from "src/shared/lib";
import { commonClasses } from "src/shared/styles";

import { useValidateProject } from "../../lib/hooks/useValidateProject";

type Props = {
  storeKey: string;
  mode: NApp.Mode;
};

const Operations: FC<Props> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateProject = useValidateProject();

  const [fetchUpdate] = useUpdateProjectMutation();
  const [fetchCreate] = useAddProjectMutation();

  const { entitySelector: projectSelector, setEntity: setProject } = useEditorStore<ProjectState>(storeKey);
  const project = useAppSelector(projectSelector) ?? {};

  const handleSave = () => {
    const errors = validateProject(project);
    if (errors.length) {
      enqueueSnackbar(errors.join("\n"), { variant: "error", autoHideDuration: 10000 });
      return;
    }
    const queryMethod = mode === "edit" ? fetchUpdate : fetchCreate;
    const queryArg = mode === "edit" ? project : { ...project, _id: undefined };
    queryMethod(queryArg as Project)
      .unwrap()
      .then((details) => {
        setProject(details);
        mode === "create" && navigate(details._id);
        enqueueSnackbar(t("Saved"), { variant: "success" });
      })
      .catch(() => enqueueSnackbar(t("Saving error"), { variant: "error" }));
  };

  return (
    <Grid item xs={12} className={commonClasses.title}>
      {t("Project card")}{" "}
      <GlassButton variant="contained" onClick={handleSave} sx={{ height: "35px", ml: "20px" }}>
        {mode === "edit" ? t("Save") : t("Create")}
      </GlassButton>
    </Grid>
  );
};

export default Operations;
