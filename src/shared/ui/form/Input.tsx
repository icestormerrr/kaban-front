import { FC, memo } from "react";

import InputBoolean, { InputBooleanProps } from "./inputs/InputBoolean";
import InputNumber, { InputNumberProps } from "./inputs/InputNumber";
import InputSelect, { InputSelectProps } from "./inputs/InputSelect";
import InputString, { InputStringProps } from "./inputs/InputString";
import InputDate, { InputDateProps } from "./inputs/InputDate";
import { FieldType } from "@/shared/const";

type InputProps = (InputBooleanProps | InputNumberProps | InputSelectProps | InputStringProps) & {
  type: FieldType;
};

const Input: FC<InputProps> = ({ type, ...restProps }) => {
  switch (type) {
    case "string":
      return <InputString {...(restProps as InputStringProps)} />;
    case "number":
      return <InputNumber {...(restProps as InputNumberProps)} />;
    case "boolean":
      return <InputBoolean {...(restProps as InputBooleanProps)} mode={"slider"} />;
    case "select":
      return <InputSelect {...(restProps as InputSelectProps)} />;
    case "date":
      return <InputDate {...(restProps as InputDateProps)} />;
    default:
      return <div></div>;
  }
};

export default memo(Input);
