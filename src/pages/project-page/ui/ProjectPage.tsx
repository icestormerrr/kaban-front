import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorStore } from "@/shared/lib";
import {
  initialProjectState,
  ProjectState,
  useLazyGetProjectDetailsQuery,
  useProjectIdFromPath,
} from "@/entities/project";
import { GlassContainer } from "@/shared/ui";
import { commonClasses } from "@/shared/styles";

import Content from "./modules/Content";
import Operations from "./modules/Operations";

const ProjectPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const _id = useProjectIdFromPath();

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
    <GlassContainer className={commonClasses.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Operations storeKey={storeKey} mode={mode} />
        <Content storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default ProjectPage;
