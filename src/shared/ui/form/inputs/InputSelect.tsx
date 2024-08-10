import React, { FC, SyntheticEvent, useEffect, useState } from "react";

import { Autocomplete, SxProps, TextField } from "@mui/material";

const getOptionLabel = (option: Option) => option.name;
const isOptionEqualToValue = (option: Option, selectedValue: Option) => option._id === selectedValue._id;

export type Option = NApp.NamedEntity & { [key: string]: unknown };

export type InputSelectProps = {
  value: string | null;
  options: Option[];
  onChange: (newOption: Option | null) => void;
} & NApp.UncontrolledInputProps<Option> & {
    size?: "small" | "medium";
    loadingText?: string;
    loading?: boolean;
  };

const InputSelect: FC<InputSelectProps> = ({
  value,
  onChange,
  options,
  label,
  size = "small",
  required,
  placeholder,
  showBorder = false,
  ...restProps
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>({ _id: value || "", name: "" });

  const handleChange = (_: SyntheticEvent, newOption: Option | null) => {
    setSelectedOption(newOption);
    onChange(newOption);
  };

  const styles: SxProps = showBorder
    ? {
        "& .MuiInputBase-root": {
          border: `1px solid rgba(255,255,255,0.2)`,
        },
      }
    : {};

  useEffect(() => {
    setSelectedOption(options.find((option) => option._id === value) ?? null);
  }, [options, value]);

  return (
    <Autocomplete
      disableClearable={required}
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      sx={styles}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} error={required && !value} />
      )}
      size={size}
      {...restProps}
    />
  );
};

export default InputSelect;
