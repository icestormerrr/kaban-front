import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { useEditorSlice } from "@/shared/store";
import {
  initialProjectState,
  ProjectState,
  useLazyGetProjectDetailsQuery,
  useProjectIdFromPath,
} from "@/entities/project";
import { GlassContainer } from "@/shared/ui";

import Content from "./modules/Content";
import Operations from "./modules/Operations";
import CustomFieldsGrid from "@/pages/project/ui/modules/CustomFieldsGrid";

const ProjectPage: FC<NApp.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const _id = useProjectIdFromPath();

  const [fetchDetails] = useLazyGetProjectDetailsQuery();
  const { setEntity: setProject } = useEditorSlice<ProjectState>(storeKey);

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
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "30px" }}>
        <Operations storeKey={storeKey} mode={mode} />
        <Content storeKey={storeKey} />
        <CustomFieldsGrid storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default ProjectPage;
