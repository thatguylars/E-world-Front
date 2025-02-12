import { configureStore } from "@reduxjs/toolkit";
import swagSlice from "./swagSlice";
import { swagsApi } from "./swagsApi";
import userSlice from "./userSlice";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [swagsApi.reducerPath]: swagsApi.reducer,
    swagSlice,
    [userApi.reducerPath]: userApi.reducer,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swagsApi.middleware, userApi.middleware),
});
