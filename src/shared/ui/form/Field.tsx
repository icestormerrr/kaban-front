import React, { FC, memo } from "react";

import FieldBoolean, { FieldBooleanProps } from "./fields/FieldBoolean";
import FieldNumber, { FieldNumberProps } from "./fields/FieldNumber";
import FieldSelect, { FieldSelectProps } from "./fields/FieldSelect";
import FieldString, { FieldStringProps } from "./fields/FieldString";
import FieldDate, { FieldDateProps } from "./fields/FieldDate";
import { FieldType } from "@/shared/const";

type FieldProps = (FieldBooleanProps | FieldNumberProps | FieldSelectProps | FieldStringProps) & {
  type: FieldType;
};

const Field: FC<FieldProps> = ({ type, ...restProps }) => {
  switch (type) {
    case "string":
      return <FieldString {...(restProps as FieldStringProps)} />;
    case "number":
      return <FieldNumber {...(restProps as FieldNumberProps)} />;
    case "boolean":
      return <FieldBoolean {...(restProps as FieldBooleanProps)} mode={"slider"} />;
    case "select":
      return <FieldSelect {...(restProps as FieldSelectProps)} />;
    case "date":
      return <FieldDate {...(restProps as FieldDateProps)} />;
    default:
      return <div></div>;
  }
};

export default memo(Field);
