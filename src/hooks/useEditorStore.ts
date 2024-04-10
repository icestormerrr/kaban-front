import { useDispatch } from "react-redux";
import { useAppSelector } from "./useAppSelector";
import { setEntity, setEntityProperty } from "../store/editor/slice";
import { useCallback, useEffect, useMemo } from "react";

export const useEditorStore = <T>(initialState: T) => {
  const dispatch = useDispatch();
  const entity = useAppSelector((state) => state.editor.entity as T);
  const setE = useCallback(
    (entity: T) => {
      dispatch(setEntity(entity));
    },
    [dispatch],
  );
  const setP = useCallback(
    <K extends keyof T>(property: K, value: T[K]) => {
      dispatch(setEntityProperty({ property, value }));
    },
    [dispatch],
  );

  useEffect(() => {
    setE(initialState);
  }, [initialState, setE]);

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
