import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import classes from "./Home.module.scss";
import GlassContainer from "../../components/container/glass-container/GlassContainer";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <GlassContainer className={classes.tmp}>
      <Button onClick={() => navigate("/board")}>Go to boards</Button>
    </GlassContainer>
  );
};

export default Home;
