import React from "react";
import { Grid } from "@mui/material";

import { GlassContainer } from "../../../shared/ui";

import Operations from "./modules/Operations";
import BacklogGrid from "./modules/BacklogGrid";
import classes from "./Backlog.module.scss";

const BacklogPage = () => {
  return (
    <GlassContainer className={classes.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Operations />
        <BacklogGrid />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
