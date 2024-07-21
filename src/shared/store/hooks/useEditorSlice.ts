import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { addElementToProperty, setEntity, setEntityProperty, removeElementFromProperty } from "@/shared/store/slices/editorSlice";
import { RootState } from "@/app/store/store";

export const useEditorSlice = <T>(storeKey: string, initialState?: T) => {
  const dispatch = useDispatch();
  const setEnt = useCallback(
    (entity: T) => {
      dispatch(setEntity({ storeKey, entity }));
    },
    [dispatch, storeKey],
  );
  const setProp = useCallback(
    <K extends keyof T>(property: K, value: T[K]) => {
      dispatch(setEntityProperty({ storeKey, property, value }));
    },
    [dispatch, storeKey],
  );
  
  const addElement = useCallback(<K extends keyof T>(property: K, value: T[K] extends Array<infer I> | null ? I : never) => {
    dispatch(addElementToProperty({ storeKey, property, value }));
  }, [dispatch, storeKey])

  const removeElement = useCallback(<K extends keyof T>(property: K, searchPayload: number | string | {[key: string]: any}) => {
    dispatch(removeElementFromProperty({storeKey, property,searchPayload}))
  }, [dispatch, storeKey])

  const getPropertySelector = useCallback(
    <K extends keyof T>(property: K) => {
      return (state: RootState): T[K] => state.editor[storeKey]?.[property];
    },
    [storeKey],
  );

  const entitySelector = useCallback((state: RootState): T => state.editor[storeKey], [storeKey]);

  useEffect(() => {
    if (initialState) setEnt(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () =>
      ({
        setEntity: setEnt,
        setEntityProperty: setProp,
        addElementToProperty: addElement,
        removeElementFromProperty: removeElement,
        entitySelector,
        getPropertySelector,
      }) as const,
    [addElement, entitySelector, getPropertySelector, removeElement, setEnt, setProp],
  );
};
