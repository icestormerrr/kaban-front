import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EntityState<T = any> = {
  entity: T;
  editing: boolean;
};

const initialState: EntityState = {
  entity: {},
  editing: false,
};

const entitySlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEntity: (state, action: PayloadAction<any>) => {
      state.entity = action.payload;
    },
    setEntityProperty: (state, action: PayloadAction<{ property: any; value: any }>) => {
      const { property, value } = action.payload;
      state.entity[property] = value;
    },
  },
});

export const { setEntity, setEntityProperty } = entitySlice.actions;
export default entitySlice;
