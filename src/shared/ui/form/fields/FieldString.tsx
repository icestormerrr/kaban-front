import { memo, useCallback } from "react";
import InputString, { InputStringProps } from "../inputs/InputString";
import { useAppSelector, useEditorSlice } from "@/shared/store";

export type FieldStringProps = Omit<InputStringProps, "value" | "onChange"> & {
  storeKey: string;
  property: string;
};
// TODO: find out how to type this component
const FieldString = ({ storeKey, property, ...restProps }: FieldStringProps) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: string | null) => setEntityProperty(property, value),
    [property, setEntityProperty],
  );

  return <InputString value={value} onChange={handleChange} {...restProps} />;
};

export default memo(FieldString);
