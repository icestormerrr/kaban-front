import React from "react";
import { Grid } from "@mui/material";

import { GlassContainer } from "@/shared/ui";
import { commonClasses } from "@/shared/styles";

import Operations from "./modules/Operations";
import BacklogGrid from "./modules/BacklogGrid";

const BacklogPage = () => {
  return (
    <GlassContainer className={commonClasses.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Operations />
        <BacklogGrid />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
