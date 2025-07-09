import { createSlice } from "@reduxjs/toolkit";
import { MenuPageState } from "../../../lib/types/screen";

const initialState: MenuPageState = {
  products: [],
  chosenProduct: null,
};

const menuPageSlice = createSlice({
  name: "menuPage",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const { setProducts, setChosenProduct } = menuPageSlice.actions;

const MenuPageReducer = menuPageSlice.reducer;
export default MenuPageReducer;
