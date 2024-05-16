import React, { FC, SyntheticEvent, useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

const autocompleteStyleSmall = {
  maxWidth: 400,
  minWidth: 100,
  width: "100%",
  "& .MuiInputBase-root": {
    padding: "0 0 0 5px",
    borderRadius: "10px",
  },
  "& .MuiInputLabel-root": {
    fontSize: 14,
    marginTop: -0.75,
  },
};

const autocompleteStyleLarge = {
  maxWidth: 1000,
  minWidth: 100,
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: "10px",
  },
};

const getOptionLabel = (option: Option) => option.name;
const isOptionEqualToValue = (option: Option, selectedValue: Option) => option._id === selectedValue._id;

type Option = NApp.NamedEntity & { [key: string]: any };

export type InputSelectProps = {
  value: string | null;
  options: Option[];
  onChange: (newOption: Option | null) => void;
  size?: "small" | "large";
  label?: string;
  className?: string;
  disable?: boolean;
  loadingText?: string;
  loading?: boolean;
  required?: boolean;
  fullWidth?: boolean;
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
      {...restProps}
      disableClearable={required}
      sx={size === "small" ? autocompleteStyleSmall : autocompleteStyleLarge}
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default InputSelect;
