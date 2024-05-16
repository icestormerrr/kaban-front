import React, { FC, useEffect, useState } from "react";

import { TextField, TextFieldProps } from "@mui/material";

const textFieldStyles = {
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
};

export type InputStringProps = Omit<TextFieldProps, "value" | "onChange" | "error" | "helperText"> & {
  value: string | null;
  onChange: (newValue: string | null) => void;
  validate?: (value: string | null) => string | null;
};

const InputString: FC<InputStringProps> = ({ value, onChange, validate, disabled, required, sx, ...restProps }) => {
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
      sx={{ ...sx, ...textFieldStyles }}
      {...restProps}
    />
  );
};

export default InputString;
