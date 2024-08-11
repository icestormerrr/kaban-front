import React from "react";
import { Grid } from "@mui/material";

import { GlassContainer } from "@/shared/ui";
import TaskGrid from "@/widgets/task-grid/ui/TaskGrid";
import Operations from "./modules/Operations";

const BacklogPage = () => {
  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "30px" }}>
        <Operations />
        <TaskGrid height="73vh" />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
