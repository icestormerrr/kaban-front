import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useProjectIdFromPath } from "@/entities/project";
import Logo from "@/widgets/main-layout/assets/logo.svg?react";
import UserMenu from "./modules/UserMenu";
import ProjectSelect from "./modules/ProjectSelect";
import ProjectRoutes from "./modules/ProjectRoutes";
import classes from "./MainLayout.module.scss";

const MainLayout: FC = () => {
  const navigate = useNavigate();
  const [showLayoutDetails, setShowLayoutDetails] = useState(true);

  const projectId = useProjectIdFromPath();

  const handleHomeNavigate = () => {
    if (projectId) {
      navigate(`/project/${projectId}/home`);
    } else {
      navigate("/");
    }
  };

  const toggleLayoutDetails = () => setShowLayoutDetails((old) => !old);
  const toggleButtonStyles = {
    transform: `rotate(${showLayoutDetails ? 0 : 180}deg)`,
    transition: "transform .5s",
  };

  return (
    <>
      <header className={classes.headerContainer}>
        <div className={classes.logoContainer}>
          <Logo onClick={handleHomeNavigate} className={classes.logo} />
          <IconButton onClick={toggleLayoutDetails} style={toggleButtonStyles}>
            <ArrowForwardIcon />
          </IconButton>
        </div>

        <nav className={classes.navContainer} style={{ display: showLayoutDetails ? "flex" : "none" }}>
          <ProjectSelect />
          <ProjectRoutes />
        </nav>

        {showLayoutDetails && <UserMenu />}
      </header>
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
