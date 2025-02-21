import { configureStore } from "@reduxjs/toolkit";
import swagSlice from "./swagSlice";
import { swagsApi } from "./swagApi"; // Correct import
import userSlice from "./userSlice";
import { userApi } from "./userApi";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [swagsApi.reducerPath]: swagsApi.reducer,
    swagSlice,
    [userApi.reducerPath]: userApi.reducer,
    userSlice,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swagsApi.middleware, userApi.middleware),
});

export default store;
