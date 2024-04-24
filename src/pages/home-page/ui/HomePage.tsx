import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "src/shared/ui";
import { useProjectId } from "src/entities/project";

import classes from "./HomePage.module.scss";

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <GlassContainer className={classes.container}>
      <h3 className={classes.title}>{t("Welcome to KaBan, have a nice work :3")}</h3>
    </GlassContainer>
  );
};

export default HomePage;
