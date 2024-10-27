import { memo, useCallback } from "react";

import { useAppSelector, useEditorSlice } from "@/shared/store";
import InputNumber, { InputNumberProps } from "../inputs/InputNumber";

export type FieldNumberProps = Omit<InputNumberProps, keyof Shared.ControlledInputProps<number>> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldNumber = ({ storeKey, property, ...restProps }: FieldNumberProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: number | null) => setEntityProperty(property, value),
    [property, setEntityProperty],
  );

  return <InputNumber value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldNumber);
