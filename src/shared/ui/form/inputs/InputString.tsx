import React, { FC, memo, useEffect, useState } from "react";

import { SxProps, TextField, TextFieldProps } from "@mui/material";

export type InputStringProps = Shared.ControlledInputProps<string> & {
  size?: "small" | "medium";
  type?: string;
  rows?: string | number;
  InputProps?: TextFieldProps["InputProps"];
  multiline?: boolean;
  asEditableTitle?: boolean;
  style?: SxProps;
} & Shared.UncontrolledInputProps<string>;

const InputString: FC<InputStringProps> = ({
  value,
  onChange,
  validate,
  disabled,
  required,
  label,
  asEditableTitle,
  style,
  showBorder = false,
  size = "small",
  ...restProps
}) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  useEffect(() => {
    if (validate) {
      const errorMessage = validate(value);
      setErrorText(errorMessage);
    }
  }, [validate, value]);

  const styles: SxProps = showBorder
    ? {
        "& .MuiInputBase-root": {
          border: `1px solid rgba(255,255,255,0.2)`,
        },
        ...(style ?? {}),
      }
    : (style ?? {});

  return (
    <TextField
      value={value ?? ""}
      onChange={handleChange}
      error={!!errorText || (required && !value)}
      helperText={errorText}
      disabled={disabled}
      size={size}
      label={asEditableTitle ? null : label}
      sx={styles}
      {...restProps}
    />
  );
};

export default memo(InputString);
