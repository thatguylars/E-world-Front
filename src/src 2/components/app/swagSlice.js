import { createSlice } from "@reduxjs/toolkit";
import { swagsApi } from "./swagsApi";
import { userApi } from "./userApi";

const swagSlice = createSlice({
  name: "swagSlice",
  initialState: {
    swags: [],
    swag: null,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      swagsApi.endpoints.getAllSwags.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          swags: payload.swags,
        };
      },
    );
    builder.addMatcher(
      swagsApi.endpoints.getSingleSwag.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          swag: payload.swag,
        };
      },
    );
    builder.addMatcher(
      swagsApi.endpoints.updateSwag.matchFulfilled,
      (state, { payload }) => {
        state.swags = state.swags.map((swag) => {
          return swag.id === payload.swag.id
            ? { ...swag, available: payload.swag.available }
            : swag;
        });
        return state;
      },
    );
    builder.addMatcher(
      userApi.endpoints.deleteSwag.matchFulfilled,
      (state, { payload }) => {
        state.swags = state.swags.map((swag) => {
          return swag.id === payload.deletedReservation.swagid
            ? { ...swag, available: true }
            : swag;
        });
        return state;
      },
    );
  },
});

export default swagSlice.reducer;
