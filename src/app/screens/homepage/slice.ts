import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  newDishes: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setNewDishes(state, action) {
      state.newDishes = action.payload;
    },
  },
});

export const { setNewDishes } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
