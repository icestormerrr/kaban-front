import React, { FC, memo, useEffect, useState } from "react";

import { TextField, TextFieldProps } from "@mui/material";

const inputTitleStyles = {
  "& .MuiInputBase-input": {
    padding: 0,
  },
  "& .MuiInputBase-root": {
    fontFamily: "Benzin",
    fontSize: "25px",
    "& fieldset": {
      border: `1px solid rgba(255,255,255,0)`,
      transition: "border .15s",
    },
  },
};
export type InputStringProps = {
  value: string | null;
  onChange: (newValue: string | null) => void;
  validate?: (value: string | null) => string | null;
  label?: string;
  className?: string;

  size?: "small" | "medium";
  type?: string;
  rows?: string | number;
  InputProps?: TextFieldProps["InputProps"];

  fullWidth?: boolean;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  asEditableTitle?: boolean;
};

const InputString: FC<InputStringProps> = ({
  value,
  onChange,
  validate,
  disabled,
  required,
  label,
  asEditableTitle,
  size = "small",
  ...restProps
}) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    if (validate) {
      const errorMessage = validate(value);
      setErrorText(errorMessage);
    }
  }, [validate, value]);

  return (
    <TextField
      value={value ?? ""}
      onChange={handleChange}
      error={!!errorText || (required && !value)}
      helperText={errorText}
      disabled={disabled}
      size={size}
      label={asEditableTitle ? null : label}
      sx={asEditableTitle ? inputTitleStyles : null}
      {...restProps}
    />
  );
};

export default memo(InputString);
