import React, { FC, memo, useCallback } from "react";
import InputDate, { InputDateProps } from "../inputs/InputDate";
import { useAppSelector, useEditorSlice } from "@/shared/store";

export type FieldDateProps = Omit<InputDateProps, keyof Shared.ControlledInputProps<boolean>> & {
  storeKey: string;
  property: string;
};
const FieldDate: FC<FieldDateProps> = ({ storeKey, property, ...restProps }) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: Shared.UTCDate | null) => setEntityProperty(property, value),
    [property, setEntityProperty],
  );

  return <InputDate value={value} onChange={handleChange} {...restProps} />;
};
export default memo(FieldDate);
