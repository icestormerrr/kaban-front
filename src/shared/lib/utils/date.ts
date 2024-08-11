import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function utcToLibDate(value?: dayjs.ConfigType): Shared.LibDate {
  return dayjs(value).utc();
}
