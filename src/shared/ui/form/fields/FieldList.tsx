import { FC, useCallback } from "react";

import InputList, { InputListProps } from "../inputs/InputList";
import { useAppSelector, useEditorSlice } from "../../../store";

type Props = Omit<InputListProps, "list" | "onListChange"> & {
  storeKey: string;
  property: string;
};

const FieldList: FC<Props> = ({ storeKey, property, ...restProps }) => {
  const { getPropertySelector, setEntityProperty } = useEditorSlice<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: Shared.NamedEntity[] | null) => setEntityProperty(property, value),
    [property, setEntityProperty],
  );

  return <InputList list={value ?? []} onListChange={handleChange} {...restProps} />;
};

export default FieldList;
