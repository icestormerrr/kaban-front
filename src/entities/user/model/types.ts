export type User = NApp.NamedEntity & {
  email: string;
};

export type UserState = NApp.Nullable<User> & { password: string | null };

export type UserLoginQuery = Pick<NonNullable<UserState>, "email" | "password">;

export type UserRegisterQuery = Pick<NonNullable<UserState>, "email" | "password" | "name">;

export type UserFilter = { usersIds?: string[] };
