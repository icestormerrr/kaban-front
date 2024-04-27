import React, { FC, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { GlassContainer, InputSelect } from "src/shared/ui";
import { commonClasses } from "src/shared/styles";
import { useSavedState } from "src/shared/lib";
import { backgroundImagesOptions, Settings, SETTINGS_PERSIST_KEY } from "src/entities/settings";

type Props = {
  storeKey: string;
};

const SettingsPage: FC<Props> = ({ storeKey }) => {
  const { t } = useTranslation();

  const [needReload, setNeedReload] = useState(false);
  const [settings, setSettings] = useSavedState<Settings>(SETTINGS_PERSIST_KEY, {});

  const handleBackgroundChange = (newBackground: NApp.NamedEntity | null) => {
    newBackground && setSettings({ ...settings, backgroundImage: newBackground._id });
    setNeedReload(true);
  };

  return (
    <GlassContainer className={commonClasses.container}>
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Grid item xs={12} className={commonClasses.title}>
          {t("Settings")}
        </Grid>
        {needReload && (
          <Grid item xs={12} style={{ fontSize: "20px" }}>
            {t("A reboot is required to apply the changes")}
          </Grid>
        )}
        <Grid item xs={12}>
          <InputSelect
            value={settings.backgroundImage ?? null}
            options={backgroundImagesOptions}
            onChange={handleBackgroundChange}
            label={t("Background")}
          />
        </Grid>
      </Grid>
    </GlassContainer>
  );
};

export default SettingsPage;
