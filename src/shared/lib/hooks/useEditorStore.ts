import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "./useAppSelector";
import { setEntity, setEntityProperty } from "../store/editorSlice";
import { RootState } from "../../../app/store/store";

export const useEditorStore = <T>(storeKey: string, initialState?: T) => {
  const dispatch = useDispatch();
  const entity = useAppSelector((state) => state.editor[storeKey] as T);
  const setE = useCallback(
    (entity: T) => {
      dispatch(setEntity({ storeKey, entity }));
    },
    [dispatch, storeKey],
  );
  const setP = useCallback(
    <K extends keyof T>(property: K, value: T[K]) => {
      dispatch(setEntityProperty({ storeKey, property, value }));
    },
    [dispatch, storeKey],
  );

  const getEntityPropertySelector = useCallback(<K extends keyof T>(property: K) => {
    return (state: RootState): T[K] => state.editor[storeKey]?.[property];
  }, []);

  useEffect(() => {
    if (initialState) setE(initialState);
  }, []);

  return useMemo(
    () =>
      ({
        entity: entity || initialState || ({} as T),
        setEntity: setE,
        setEntityProperty: setP,
        getEntityPropertySelector,
      }) as const,
    [entity, initialState, setE, setP],
  );
};
