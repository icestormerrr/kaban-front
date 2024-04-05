import { useEffect, useState } from "react";

export const useSavedState = <T>(key: string, state: T) => {
  const [localState, setLocalState] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      try {
        return JSON.parse(localStorageValue);
      } catch (e) {
        return localStorageValue;
      }
    }
    return state;
  });

  useEffect(() => {
    if (localState) {
      localStorage.setItem(key, typeof localState === "string" ? localState : JSON.stringify(localState));
    }
  }, [key, localState]);

  return [localState, setLocalState] as const;
};
