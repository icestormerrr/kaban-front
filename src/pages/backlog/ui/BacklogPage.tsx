import React from "react";
import { Grid } from "@mui/material";

import { GlassContainer } from "@/shared/ui";

import Operations from "./modules/Operations";
import TaskGrid from "./modules/TaskGrid";

const BacklogPage = () => {
  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "30px" }}>
        <Operations />
        <TaskGrid />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
