import { useEffect, useState } from "react";

export const useSavedState = <T>(key: string, state: T) => {
  const [localState, setLocalState] = useState<T>(() => {
    if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key) ?? "");
    return state;
  });

  useEffect(() => {
    console.log(localState);

    if (localState) {
      localStorage.setItem(key, JSON.stringify(localState));
    }
  }, [key, localState]);

  return [localState, setLocalState] as const;
};
