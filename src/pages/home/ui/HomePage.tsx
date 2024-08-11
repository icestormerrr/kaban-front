import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";
import { CriticalTasks } from "@/widgets/critical-tasks";

import classes from "./HomePage.module.scss";

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <GlassContainer className={clsx(classes.helloContainer, classes.section)}>
        <h2>{t("Welcome to KaBan, have a nice work :3")}</h2>
      </GlassContainer>
      <GlassContainer className={classes.section}>
        <CriticalTasks />
      </GlassContainer>
    </div>
  );
};

export default HomePage;
