import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  newDishes: [],
  popularDishes: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setNewDishes(state, action) {
      state.newDishes = action.payload;
    },
    setPopularDishes(state, action) {
      state.popularDishes = action.payload;
    },
  },
});

export const { setNewDishes, setPopularDishes } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
