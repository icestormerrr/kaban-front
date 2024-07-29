import React from "react";
import { Grid } from "@mui/material";

import { GlassContainer } from "@/shared/ui";

import Operations from "./modules/Operations";
import BacklogGrid from "./modules/BacklogGrid";

const BacklogPage = () => {
  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "30px" }}>
        <Operations />
        <BacklogGrid />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
