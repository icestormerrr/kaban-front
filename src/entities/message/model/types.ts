export type Message = NApp.Entity & {
  description: string;
  date: NApp.Date;
  userId: string;
};
