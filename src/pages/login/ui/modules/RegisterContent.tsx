import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { InputString } from "@/shared/ui";
import { useAppSelector, useEditorStore } from "@/shared/store";
import { UserState } from "@/entities/user";

const RegisterContent: FC<NApp.PageProps> = ({ storeKey }) => {
  const { t } = useTranslation();
  const { entitySelector: userSelector, setEntityProperty: setUserProperty } = useEditorStore<UserState>(storeKey);
  const { name } = useAppSelector(userSelector) || {};

  return (
    <>
      <InputString label={t("Name")} value={name} onChange={(newName) => setUserProperty("name", newName)} />
    </>
  );
};

export default RegisterContent;
