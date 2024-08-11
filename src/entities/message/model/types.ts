export type Message = Shared.Entity & {
  description: string;
  date: Shared.Date;
  userId: string;
};
