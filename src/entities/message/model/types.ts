export type Message = Shared.Entity & {
  description: string;
  date: Shared.LibDate;
  userId: string;
};
