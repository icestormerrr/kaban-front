import React, { FC, SyntheticEvent, useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

const autocompleteStyle = {
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

type Option = NApp.NamedEntity & { [key: string]: any };

type Props = {
  value: string | null;
  options: Option[];
  onChange: (newOption: Option | null) => void;
  label?: string;
  className?: string;
  disableClearable?: boolean;
  disable?: boolean;
  loadingText?: string;
  loading?: boolean;
};
const InputSelect: FC<Props> = ({ value, onChange, options, label, ...restProps }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>({ _id: value || "", name: "" });

  const handleChange = (e: SyntheticEvent, newOption: Option | null) => {
    setSelectedOption(newOption);
    onChange(newOption);
  };

  const getOptionLabel = (option: Option) => option.name;

  const isOptionEqualToValue = (option: Option, selectedValue: Option) => option._id === selectedValue._id;

  useEffect(() => {
    setSelectedOption(options.find((option) => option._id === value) ?? null);
  }, [options, value]);

  return (
    <Autocomplete
      {...restProps}
      sx={autocompleteStyle}
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
