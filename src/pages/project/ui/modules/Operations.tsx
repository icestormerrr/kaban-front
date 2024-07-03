import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "@/shared/ui";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { compact } from "lodash";

import { Project, ProjectState, useAddProjectMutation, useUpdateProjectMutation } from "@/entities/project";
import { useAppSelector, useEditorStore } from "@/shared/store";
import { commonClasses } from "@/shared/styles";

type Props = {
  storeKey: string;
  mode: NApp.Mode;
};

const Operations: FC<Props> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fetchUpdate] = useUpdateProjectMutation();
  const [fetchCreate] = useAddProjectMutation();

  const { entitySelector: projectSelector, setEntity: setProject } = useEditorStore<ProjectState>(storeKey);
  const project = useAppSelector(projectSelector) ?? {};

  const validateProject = useCallback((project: ProjectState) => {
    const errors: string[] = compact([
      (!project.name ||
        !project.description ||
        !project.epics?.length ||
        !project.sprints?.length ||
        !project.stages?.length ||
        !project.users?.length) &&
        "Required field are not filled",
    ]);

    if (!project.users?.includes(project.authorId!)) errors.push("Author is not selected as member");
    return errors;
  }, []);

  const handleSave = () => {
    const errors = validateProject(project);
    if (errors.length) {
      enqueueSnackbar(errors.map((err) => t(err)).join(";   "), { variant: "error", autoHideDuration: 5000 });
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
