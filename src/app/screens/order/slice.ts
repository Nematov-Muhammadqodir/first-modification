import { createSlice } from "@reduxjs/toolkit";
import { OrderPageState } from "../../../lib/types/screen";

const initialState: OrderPageState = {
  processOrders: [],
  finishedOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setFinishedOrders, setProcessOrders } = ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
