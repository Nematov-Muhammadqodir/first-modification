import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homepage/slice";

import reduxLogger from "redux-logger";
import MenuPageReducer from "./screens/menu/slice";
import OrdersPageReducer from "./screens/order/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    menuPage: MenuPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
