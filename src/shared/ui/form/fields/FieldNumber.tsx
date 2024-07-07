import React, { memo, useCallback } from "react";

import { useAppSelector, useEditorStore } from "@/shared/store";
import InputNumber, { InputNumberProps } from "../inputs/InputNumber";

export type FieldNumberProps = Omit<InputNumberProps, keyof NApp.ControlledInputProps<number>> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldNumber = ({ storeKey, property, ...restProps }: FieldNumberProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorStore<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback((value: number | null) => setEntityProperty(property, value), [property]);

  return <InputNumber value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldNumber);
