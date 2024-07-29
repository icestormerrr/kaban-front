import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { GlassContainer } from "@/shared/ui";

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <GlassContainer className="pageContainer">
      <h3>{t("Welcome to KaBan, have a nice work :3")}</h3>
    </GlassContainer>
  );
};

export default HomePage;
