import { useDispatch } from "react-redux";
import { useAppSelector } from "./useAppSelector";
import { setEntity, setEntityProperty } from "../store/editor/slice";
import { useCallback, useEffect, useMemo } from "react";

export const useEditorStore = <T>(storeKey: string, initialState: T) => {
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

  useEffect(() => {
    setE(initialState);
  }, []);

  return useMemo(
    () =>
      ({
        entity: entity || initialState,
        setEntity: setE,
        setEntityProperty: setP,
      }) as const,
    [entity, initialState, setE, setP],
  );
};
