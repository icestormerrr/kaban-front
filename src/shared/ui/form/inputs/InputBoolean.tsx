import React, { FC, memo } from "react";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";

export type InputBooleanProps = NApp.ControlledInputProps<boolean> &
  Omit<NApp.UncontrolledInputProps<boolean>, "validate" | "required" | "fullWidth"> & {
    mode?: "checkbox" | "slider";
    labelPlacement?: "end" | "start" | "top" | "bottom";
  };

const InputBoolean: FC<InputBooleanProps> = ({ value, onChange, mode, labelPlacement, label, disabled }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };
  return (
    <div>
      <FormControlLabel
        control={
          mode === "slider" ? (
            <Switch checked={value || false} onChange={handleChange} />
          ) : (
            <Checkbox checked={value || false} onChange={handleChange} />
          )
        }
        disabled={disabled || !onChange}
        label={label}
        labelPlacement={labelPlacement}
      />
    </div>
  );
};

export default memo(InputBoolean);
