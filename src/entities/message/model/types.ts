export type Message = Shared.Entity & {
  description: string;
  date: Shared.UTCDate;
  userId: string;
};
