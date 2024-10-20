import { useNavigate } from "react-router-dom";

import { Button, MenuItem } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableRowsIcon from "@mui/icons-material/TableRows";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { t } from "i18next";

import { ButtonMenu } from "@/shared/ui";
import classes from "../MainLayout.module.scss";
import { useProjectIdFromPath } from "@/entities/project";

const ProjectRoutes = () => {
  const navigate = useNavigate();
  const projectId = useProjectIdFromPath();

  const handleProjectRouteNavigate = (route: string) => {
    return () => navigate(`/project/${projectId}/${route}`);
  };
  const handleTaskCreate = () => {
    navigate(`/project/${projectId}/task`);
  };

  const handleProjectCreate = () => {
    navigate("/project");
  };
  return (
    <>
      <Button className={classes.route} onClick={handleProjectRouteNavigate("board")}>
        <TableChartIcon />
      </Button>
      <Button className={classes.route} onClick={handleProjectRouteNavigate("backlog")}>
        <TableRowsIcon />
      </Button>
      <Button className={classes.route} onClick={handleProjectRouteNavigate("analytics")}>
        <QueryStatsIcon />
      </Button>
      <ButtonMenu label={t("Create")}>
        <MenuItem onClick={handleTaskCreate} disableRipple>
          {t("Task")}
        </MenuItem>
        <MenuItem onClick={handleProjectCreate} disableRipple>
          {t("Project")}
        </MenuItem>
      </ButtonMenu>
    </>
  );
};
export default ProjectRoutes;
