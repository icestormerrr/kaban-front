import React, { FC, useCallback } from "react";

import InputList, { InputListProps } from "../inputs/InputList";
import { useAppSelector, useEditorStore } from "../../../lib";

type Props = Omit<InputListProps, "list" | "onListChange"> & {
  storeKey: string;
  property: string;
};

const FieldList: FC<Props> = ({ storeKey, property, ...restProps }) => {
  const { getPropertySelector, setEntityProperty } = useEditorStore<any>(storeKey);
  const value = useAppSelector(getPropertySelector(property));
  const handleChange = useCallback(
    (value: NApp.NamedEntity[] | null) => setEntityProperty(property, value),
    [property],
  );

  return <InputList list={value ?? []} onListChange={handleChange} {...restProps} />;
};

export default FieldList;
