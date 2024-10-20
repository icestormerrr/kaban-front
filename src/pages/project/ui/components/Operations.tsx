import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";
import { compact } from "lodash";

import { FieldString, GlassButton } from "@/shared/ui";
import { Project, ProjectState, useAddProjectMutation, useUpdateProjectMutation } from "@/entities/project";
import { useAppSelector, useEditorSlice } from "@/shared/store";

type Props = {
  storeKey: string;
  mode: Shared.Mode;
};

const Operations: FC<Props> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fetchUpdate] = useUpdateProjectMutation();
  const [fetchCreate] = useAddProjectMutation();

  const { entitySelector: projectSelector, setEntity: setProject } = useEditorSlice<ProjectState>(storeKey);
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
    const queryArg = mode === "edit" ? project : { ...project, id: undefined };
    queryMethod(queryArg as Project)
      .unwrap()
      .then((details) => {
        setProject(details);
        if (mode === "create") navigate(details.id);
        enqueueSnackbar(t("Saved"), { variant: "success" });
      })
      .catch(() => enqueueSnackbar(t("Saving error"), { variant: "error" }));
  };

  return (
    <Grid container item xs={12}>
      <FieldString
        storeKey={storeKey}
        property="name"
        required
        style={{
          flex: "1",
          "& .MuiInputBase-input": {
            padding: 0,
          },
          "& .MuiInputBase-root": {
            fontFamily: "Benzin",
            fontSize: "25px",
          },
        }}
      />
      <GlassButton variant="contained" onClick={handleSave} sx={{ height: "35px" }}>
        <SaveIcon />
      </GlassButton>
    </Grid>
  );
};

export default Operations;
