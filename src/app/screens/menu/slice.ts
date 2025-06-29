import { createSlice } from "@reduxjs/toolkit";
import { MenuPageState } from "../../../lib/types/screen";

const initialState: MenuPageState = {
  products: [],
};

const menuPageSlice = createSlice({
  name: "menuPage",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = menuPageSlice.actions;

const MenuPageReducer = menuPageSlice.reducer;
export default MenuPageReducer;
