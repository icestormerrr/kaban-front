import React, { FC, memo, useCallback } from "react";
import InputString, { InputStringProps } from "../inputs/InputString";
import { useAppSelector, useEditorStore } from "../../lib";

type Props = Omit<InputStringProps, "value" | "onChange"> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldString = ({ storeKey, property, ...restProps }: Props) => {
  const { getEntityPropertySelector, setEntityProperty } = useEditorStore<any>(storeKey);
  const value = useAppSelector(getEntityPropertySelector(property));
  const handleChange = useCallback((value: string | null) => setEntityProperty(property, value), [property]);

  return <InputString value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldString);
