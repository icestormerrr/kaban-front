import { Grid } from "@mui/material";

import { GlassContainer } from "@/shared/ui";
import { TaskGrid } from "@/widgets/task-grid";
import Operations from "@/pages/backlog/ui/components/Operations";

const BacklogPage = () => {
  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "20px" }}>
        <Operations />
        <TaskGrid height="80vh" />
      </Grid>
    </GlassContainer>
  );
};

export default BacklogPage;
