declare namespace NApp {
  export type Entity = {
    _id: string;
  };

  export type Mode = "create" | "edit";

  export type EntityComponent = {
    mode: Mode;
    storeKey: string;
  };

  export type Date = number;

  export type NamedEntity = Entity & {
    name: string;
  };

  export type Nullable<T> = {
    [key in keyof T]: T[key] | null;
  };

  export type PageProps = {
    storeKey: string;
  };

  export type PageWithModeProps = PageProps & { mode: Mode };
}

declare module "*.scss" {
  const exports: { [exportName: string]: string };
  export = exports;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

declare module "*.png";
