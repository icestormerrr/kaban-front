import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, SxProps, TextField } from "@mui/material";

const getOptionLabel = (option: Option) => option.name;
const isOptionEqualToValue = (option: Option, selectedValue: Option) => option.id === selectedValue.id;

export type Option = Shared.NamedEntity & { [key: string]: unknown };

export type InputSelectProps = {
  value: string | null;
  options: Option[];
  onChange: (newOption: Option | null) => void;
} & Shared.UncontrolledInputProps<Option> & {
    size?: "small" | "medium";
    loadingText?: string;
    loading?: boolean;
    style?: SxProps;
    noOptionMessage?: string;
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
  style,
  noOptionMessage,
  ...restProps
}) => {
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<Option | null>({ id: value || "", name: "" });

  const handleChange = (_: SyntheticEvent, newOption: Option | null) => {
    setSelectedOption(newOption);
    onChange(newOption);
  };

  const styles: SxProps = showBorder
    ? {
        "& .MuiInputBase-root": {
          border: `1px solid rgba(255,255,255,0.2)`,
        },
        ...(style ?? {}),
      }
    : (style ?? {});

  useEffect(() => {
    setSelectedOption(options.find((option) => option.id === value) ?? null);
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
      noOptionsText={noOptionMessage || t("No options")}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} error={required && !value} />
      )}
      size={size}
      {...restProps}
    />
  );
};

export default InputSelect;
