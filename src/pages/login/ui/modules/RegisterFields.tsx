import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { InputString } from "@/shared/ui";
import { useAppSelector, useEditorSlice } from "@/shared/store";
import { UserState } from "@/entities/user";

const RegisterFields: FC<Shared.PageProps> = ({ storeKey }) => {
  const { t } = useTranslation();
  const { entitySelector: userSelector, setEntityProperty: setUserProperty } = useEditorSlice<UserState>(storeKey);
  const { name } = useAppSelector(userSelector) || {};

  return (
    <>
      <InputString label={t("Name")} value={name} onChange={(newName) => setUserProperty("name", newName)} showBorder />
    </>
  );
};

export default RegisterFields;
