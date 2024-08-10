import React, { FC, memo, useEffect, useState } from "react";
import { SxProps, TextField } from "@mui/material";

export type InputNumberProps = NApp.ControlledInputProps<number> &
  NApp.UncontrolledInputProps<number> & {
    min?: number;
    max?: number;
    mode?: "int" | "float";
    size?: "small" | "medium";
  };

const InputNumber: FC<InputNumberProps> = ({
  value,
  label,
  onChange,
  validate,
  required,
  disabled,
  showBorder = false,
  min,
  max,
  mode = "int",
  size = "small",
  fullWidth = true,
}) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(event.target.value));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidKeys = ["+", "-"].concat(mode == "int" ? [",", "."] : []);
    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const styles: SxProps = showBorder
    ? {
        "& .MuiInputBase-root": {
          border: `1px solid rgba(255,255,255,0.2)`,
        },
      }
    : {};

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
      size={size}
      sx={styles}
      InputProps={{
        inputProps: {
          min,
          max,
          step: mode == "int" ? 1 : 0.1,
          onKeyDown: handleKeyDown,
        },
      }}
    />
  );
};

export default memo(InputNumber);
