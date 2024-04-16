import React, { FC } from "react";

import classes from "./Home.module.scss";
import GlassContainer from "src/shared/ui/containers/glass-container/GlassContainer";

const Home: FC = () => {
  return (
    <GlassContainer className={classes.container}>
      <h3 className={classes.title}>Welcome to KaBan, have a nice work :3</h3>
    </GlassContainer>
  );
};

export default Home;
