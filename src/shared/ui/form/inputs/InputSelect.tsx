import React, { FC, SyntheticEvent, useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

const getOptionLabel = (option: Option) => option.name;
const isOptionEqualToValue = (option: Option, selectedValue: Option) => option._id === selectedValue._id;

export type Option = NApp.NamedEntity & { [key: string]: any };

export type InputSelectProps = {
  value: string | null;
  options: Option[];
  onChange: (newOption: Option | null) => void;
  size?: "small" | "medium";
  label?: string;
  className?: string;
  disable?: boolean;
  loadingText?: string;
  loading?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
};

const InputSelect: FC<InputSelectProps> = ({
  value,
  onChange,
  options,
  label,
  size = "small",
  required,
  ...restProps
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>({ _id: value || "", name: "" });

  const handleChange = (e: SyntheticEvent, newOption: Option | null) => {
    setSelectedOption(newOption);
    onChange(newOption);
  };

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
      renderInput={(params) => <TextField {...params} label={label} error={required && !value} />}
      size={size}
      {...restProps}
    />
  );
};

export default InputSelect;
