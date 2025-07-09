import { createSlice } from "@reduxjs/toolkit";
import {
  LikedProductPageState,
  MenuPageState,
} from "../../../lib/types/screen";

const initialState: LikedProductPageState = {
  products: [],
};

const likedPageSlice = createSlice({
  name: "likedPage",
  initialState,
  reducers: {
    setLikedProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setLikedProducts } = likedPageSlice.actions;

const LikedPageReducer = likedPageSlice.reducer;
export default LikedPageReducer;
