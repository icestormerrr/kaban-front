import React, { memo, useCallback } from "react";
import { useAppSelector, useEditorStore } from "@/shared/store";
import InputBoolean, { InputBooleanProps } from "../inputs/InputBoolean";

export type FieldBooleanProps = Omit<InputBooleanProps, keyof NApp.ControlledInputProps<boolean>> & {
  storeKey: string;
  property: string;
};

const FieldBoolean = ({ storeKey, property, ...restProps }: FieldBooleanProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorStore<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback((value: boolean | null) => setEntityProperty(property, value), [property]);

  return <InputBoolean value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldBoolean);
