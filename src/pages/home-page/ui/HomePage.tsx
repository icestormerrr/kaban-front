import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "src/shared/ui";
import { commonClasses } from "src/shared/styles";

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <GlassContainer className={commonClasses.container}>
      <h3 className={commonClasses.title}>{t("Welcome to KaBan, have a nice work :3")}</h3>
    </GlassContainer>
  );
};

export default HomePage;
