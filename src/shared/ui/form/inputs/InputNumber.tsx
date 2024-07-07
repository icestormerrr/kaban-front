import React, { FC, memo, useEffect, useState } from "react";
import { TextField } from "@mui/material";

export type InputNumberProps = NApp.ControlledInputProps<number> &
  NApp.UncontrolledInputProps<number> & {
    min?: number;
    max?: number;
    mode?: "int" | "float";
  };

const InputNumber: FC<InputNumberProps> = ({
  value,
  label,
  onChange,
  validate,
  required,
  disabled,
  min,
  max,
  mode = "int",

  fullWidth = true,
}) => {
  const [errorText, setErrorText] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(Number(event.target.value));
  };

  useEffect(() => {
    if (validate) {
      const errorMessage = validate(value);
      setErrorText(errorMessage);
    }
  }, [validate, value]);

  return (
    <TextField
      type="number"
      autoComplete="off"
      value={value || ""}
      onChange={handleChange}
      disabled={disabled || !onChange}
      label={label}
      error={!!errorText || (required && !value)}
      helperText={errorText}
      fullWidth={fullWidth}
      InputProps={{
        inputProps: {
          min,
          max,
          step: mode == "int" ? 1 : 0.1,
          onKeyDown: (event) => {
            const invalidKeys = ["+", "-"].concat(mode == "int" ? [",", "."] : []);
            if (invalidKeys.includes(event.key)) {
              event.preventDefault();
            }
          },
        },
      }}
    />
  );
};

export default memo(InputNumber);
