declare namespace NApp {
  export type Entity = {
    _id: string;
  };
  export type Mode = "create" | "edit";
  export type EntityComponent = {
    mode: Mode;
  };
  export type NamedEntity = Entity & {
    name: string;
  };
  export type Nullable<T> = {
    [key in keyof T]: T[key] | null;
  };
}
