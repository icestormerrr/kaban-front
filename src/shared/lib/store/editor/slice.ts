import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EntityState = Record<string, any>;

const initialState: EntityState = {};

const entitySlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<{ storeKey: string; entity: any }>) => {
      const { storeKey, entity } = action.payload;
      state[storeKey] = entity;
    },
    setEntityProperty: (state, action: PayloadAction<{ storeKey: string; property: any; value: any }>) => {
      const { storeKey, property, value } = action.payload;
      state[storeKey][property] = value;
    },
  },
});

export const { setEntity, setEntityProperty } = entitySlice.actions;
export default entitySlice;
