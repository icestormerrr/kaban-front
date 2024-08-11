export type User = Shared.NamedEntity & {
  email: string;
};

export type UserState = Shared.Nullable<User> & { password: string | null };

export type UserLoginQuery = Pick<NonNullable<UserState>, "email" | "password">;

export type UserRegisterQuery = Pick<NonNullable<UserState>, "email" | "password" | "name">;

export type UserFilter = { usersIds?: string[] };
