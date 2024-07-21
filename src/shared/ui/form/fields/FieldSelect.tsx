import React, { memo, useCallback } from "react";
import InputSelect, { InputSelectProps } from "../inputs/InputSelect";
import { useAppSelector, useEditorSlice } from "@/shared/store";

export type FieldSelectProps = Omit<InputSelectProps, "value" | "onChange"> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldSelect = ({ storeKey, property, ...restProps }: FieldSelectProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: NApp.NamedEntity | null) => setEntityProperty(property, value?._id ?? null),
    [property, setEntityProperty],
  );

  return <InputSelect value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldSelect);
