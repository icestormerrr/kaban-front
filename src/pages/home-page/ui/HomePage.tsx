import React, { FC } from "react";

import { GlassContainer } from "src/shared/ui";

import classes from "./HomePage.module.scss";

const HomePage: FC = () => {
  return (
    <GlassContainer className={classes.container}>
      <h3 className={classes.title}>Welcome to KaBan, have a nice work :3</h3>
    </GlassContainer>
  );
};

export default HomePage;
