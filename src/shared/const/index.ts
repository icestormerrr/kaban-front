export const ACCESS_TOKEN_PERSIST_KEY = "accessToken";

export enum FieldType {
  string = "string",
  number = "number",
  select = "select",
  boolean = "boolean",
  date = "date",
}

export const DATE_FORMAT = "DD.MM.YYYY" as const;
export const DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm" as const;
