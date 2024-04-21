import React, { FC, memo, useCallback } from "react";
import InputSelect, { InputSelectProps } from "../inputs/InputSelect";
import { useAppSelector, useEditorStore } from "../../lib";

type Props = Omit<InputSelectProps, "value" | "onChange"> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldSelect = ({ storeKey, property, ...restProps }: Props) => {
  const { getEntityPropertySelector, setEntityProperty } = useEditorStore<any>(storeKey);
  const value = useAppSelector(getEntityPropertySelector(property));
  const handleChange = useCallback(
    (value: NApp.NamedEntity | null) => setEntityProperty(property, value?._id ?? null),
    [property],
  );

  return <InputSelect value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldSelect);
