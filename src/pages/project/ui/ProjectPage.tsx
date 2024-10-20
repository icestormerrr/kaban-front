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

import Fields from "@/pages/project/ui/components/Fields";
import Operations from "@/pages/project/ui/components/Operations";
import CustomFieldsGrid from "@/pages/project/ui/components/CustomFieldsGrid";

const ProjectPage: FC<Shared.EntityComponent> = ({ storeKey, mode }) => {
  const { t } = useTranslation();
  const id = useProjectIdFromPath();

  const [fetchDetails] = useLazyGetProjectDetailsQuery();
  const { setEntity: setProject } = useEditorSlice<ProjectState>(storeKey);

  useEffect(() => {
    if (id && mode === "edit") {
      fetchDetails({ id })
        .unwrap()
        .then((details) => setProject(details))
        .catch(() => enqueueSnackbar(t("Server error"), { variant: "error" }));
    } else {
      setProject(initialProjectState);
    }
  }, [id, fetchDetails, mode, setProject, t]);

  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "30px" }}>
        <Operations storeKey={storeKey} mode={mode} />
        <Fields storeKey={storeKey} />
        <CustomFieldsGrid storeKey={storeKey} />
      </Grid>
    </GlassContainer>
  );
};

export default ProjectPage;
