import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";
import { commonClasses } from "@/shared/styles";

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <GlassContainer className={commonClasses.pageContainer}>
      <h3 className={commonClasses.title}>{t("Welcome to KaBan, have a nice work :3")}</h3>
    </GlassContainer>
  );
};

export default HomePage;
