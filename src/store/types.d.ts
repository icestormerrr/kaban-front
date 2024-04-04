declare namespace NApp {
  export type Entity = {
    _id: string;
  };
  export type NamedEntity = Entity & {
    name: string;
  };
  export type Nullable<T> = {
    [key in keyof T]: T[key] | null;
  };
}
