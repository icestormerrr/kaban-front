import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get, set } from "lodash";

type EntityState = Record<string, any>;

const initialState: EntityState = {};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<{ storeKey: string; entity: any }>) => {
      const { storeKey, entity } = action.payload;
      state[storeKey] = entity;
    },
    setEntityProperty: (state, action: PayloadAction<{ storeKey: string; property: any; value: any }>) => {
      const { storeKey, property, value } = action.payload;
      if (!state[storeKey]) state[storeKey] = {};
      set(state[storeKey], property, value)
    },
    addElementToProperty: (state, action: PayloadAction<{ storeKey: string; property: any; value: any }>) => {
      const { storeKey, property, value } = action.payload;
      const oldPropertyValue = get(state[storeKey], property)

      if (!state[storeKey]) {
        state[storeKey] = {};
      }

      if (Array.isArray(oldPropertyValue)) {
        oldPropertyValue.push(value)
      } else {
        set(state[storeKey], property, [value])
      }
    },
    removeElementFromProperty: (state, action: PayloadAction<{ storeKey: string; property: any; searchPayload: number | string | {[key: string]: any} }>) => {
      const { storeKey, property, searchPayload } = action.payload;
      const oldPropertyValue = get(state[storeKey], property)

      if (!state[storeKey] || !Array.isArray(oldPropertyValue)) {
        return
      }

      if (typeof searchPayload === "string" || "number") {
        set(state[storeKey], property, oldPropertyValue.filter(current => current !== searchPayload ))
      }

      if (typeof searchPayload === "object") {
        set(state[storeKey], property, oldPropertyValue.filter(current => {
          let found = true
          for (const prop in searchPayload) {
            if (current[prop] !== searchPayload[prop]) {
              found = false
            }
          }
          return !found
        } ))
      }


    }
  },
});

export const { setEntity, setEntityProperty, addElementToProperty, removeElementFromProperty } = editorSlice.actions;
export default editorSlice;
