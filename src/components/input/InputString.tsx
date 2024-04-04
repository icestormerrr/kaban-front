import React, { FC, useEffect, useState } from "react";

import { TextField, TextFieldProps } from "@mui/material";

type Props = Omit<TextFieldProps, "value" | "onChange" | "error" | "helperText"> & {
  value: string | null;
  onChange: (newValue: string | null) => void;
  validate?: (value: string | null) => string | null;
};

const InputString: FC<Props> = ({ value, onChange, validate, disabled, ...restProps }) => {
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
      value={value}
      onChange={handleChange}
      error={!!errorText && !disabled}
      helperText={errorText}
      disabled={disabled}
      {...restProps}
    />
  );
};

export default InputString;
