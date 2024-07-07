import React, { FC, memo } from "react";

import FieldBoolean, { FieldBooleanProps } from "./FieldBoolean";
import FieldNumber, { FieldNumberProps } from "./FieldNumber";
import FieldSelect, { FieldSelectProps } from "./FieldSelect";
import FieldString, { FieldStringProps } from "./FieldString";

type StoreFieldProps = (FieldBooleanProps | FieldNumberProps | FieldSelectProps | FieldStringProps) & {
  type: "string" | "number" | "boolean" | "select";
};

const StoreField: FC<StoreFieldProps> = ({ type, ...restProps }) => {
  switch (type) {
    case "string":
      return <FieldString {...(restProps as FieldStringProps)} />;
    case "number":
      return <FieldNumber {...(restProps as FieldNumberProps)} />;
    case "boolean":
      return <FieldBoolean {...(restProps as FieldBooleanProps)} />;
    case "select":
      return <FieldSelect {...(restProps as FieldSelectProps)} />;
    default:
      return <div></div>;
  }
};

export default memo(StoreField);
