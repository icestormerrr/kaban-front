import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { utcToLibDate } from "@/shared/lib";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/const";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";

export type InputDateProps = Shared.ControlledInputProps<Shared.UTCDate> &
  Shared.UncontrolledInputProps<Shared.UTCDate> & {
    format?: typeof DATE_FORMAT | typeof DATE_TIME_FORMAT;
    minDate?: Shared.UTCDate;
    maxDate?: Shared.UTCDate;
  };
const InputDate: FC<InputDateProps> = ({
  value,
  label,
  onChange,
  validate,
  required,
  disabled,
  minDate,
  maxDate,
  format = DATE_TIME_FORMAT,
  fullWidth = true,
  showBorder = false,
}) => {
  const date = useMemo<Shared.LibDate | null>(() => (value ? utcToLibDate(value) : null), [value]);
  const [errorText, setErrorText] = useState<string | null>();

  const handleChange = useCallback(
    (newDate: Shared.LibDate | null) => {
      if (onChange) onChange(newDate?.utc().valueOf() ?? 0);
    },
    [onChange],
  );

  const styles: SxProps = showBorder
    ? {
        "& .MuiInputBase-root": {
          border: `1px solid rgba(255,255,255,0.2)`,
        },
      }
    : {};

  useEffect(() => {
    if (validate) {
      const errorMessage = validate(date?.utc().valueOf() ?? 0);
      setErrorText(errorMessage);
    }
  }, [date, validate]);

  return (
    <DatePicker
      label={label}
      value={date}
      onChange={handleChange}
      minDate={minDate ? utcToLibDate(minDate) : undefined}
      maxDate={maxDate ? utcToLibDate(maxDate) : undefined}
      format={format}
      disabled={disabled || !onChange}
      timezone="system"
      slotProps={{
        field: { clearable: !required },
        textField: {
          error: !!errorText && !disabled,
          helperText: errorText,
          fullWidth,
          size: "small",
          autoComplete: "off",
          sx: styles,
        },
      }}
    />
  );
};
export default memo(InputDate);
