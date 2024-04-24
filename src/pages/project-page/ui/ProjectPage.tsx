import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorStore } from "src/shared/lib";
import { initialProjectState, ProjectState, useLazyGetProjectDetailsQuery, useProjectId } from "src/entities/project";
import { GlassContainer } from "src/shared/ui";

import Content from "./modules/Content";
import Operations from "./modules/Operations";
import classes from "./ProjectPage.module.scss";

const ProjectPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const _id = useProjectId();

  const [fetchDetails] = useLazyGetProjectDetailsQuery();
  const { setEntity: setProject } = useEditorStore<ProjectState>(storeKey);

  useEffect(() => {
    if (_id && mode === "edit") {
      fetchDetails({ _id })
        .unwrap()
        .then((details) => setProject(details))
        .catch(() => enqueueSnackbar(t("Server error"), { variant: "error" }));
    } else {
      setProject(initialProjectState);
    }
  }, [_id, fetchDetails, mode, setProject, t]);

  return (
    <GlassContainer className={classes.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Operations storeKey={storeKey} mode={mode} />
        <Content storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default ProjectPage;
