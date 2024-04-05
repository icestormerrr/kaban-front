export type User = NApp.NamedEntity & {
  email: string;
  password: string;
};

export type UserState = Omit<User, "password">;

export type UserResponse = UserState;

export type UserFilter = { usersIds?: string };
