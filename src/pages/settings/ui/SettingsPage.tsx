import { FC, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { GlassContainer, InputSelect } from "@/shared/ui";
import { useSavedState } from "@/shared/store";
import { backgroundImagesOptions, Settings, SETTINGS_PERSIST_KEY } from "@/entities/settings";

type Props = {
  storeKey: string;
};

const SettingsPage: FC<Props> = () => {
  const { t } = useTranslation();

  const [needReload, setNeedReload] = useState(false);
  const [settings, setSettings] = useSavedState<Settings>(SETTINGS_PERSIST_KEY, {});

  const handleBackgroundChange = (newBackground: Shared.NamedEntity | null) => {
    if (newBackground) setSettings({ ...settings, backgroundImage: newBackground.id });
    setNeedReload(true);
  };

  return (
    <GlassContainer className="pageContainer">
      <Grid container direction="column" sx={{ gap: "32px" }}>
        <Grid item xs={12}>
          <h2>{t("Settings")}</h2>
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
