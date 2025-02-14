import { createSlice } from "@reduxjs/toolkit";
import { swagsApi } from "./swagApi";
import { userApi } from "./userApi";

const swagSlice = createSlice({
  name: "swagSlice",
  initialState: {
    swags: [],
    swag: null,
  },
  reducers: {
    swagUpdated: (state, action) => {
      // New reducer for updating a single swag
      const updatedSwag = action.payload;
      const index = state.swags.findIndex((swag) => swag.id === updatedSwag.id);
      if (index !== -1) {
        state.swags[index] = updatedSwag;
      }
    },
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
export const { swagUpdated } = swagSlice.actions;
