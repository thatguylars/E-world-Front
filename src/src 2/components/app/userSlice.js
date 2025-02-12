import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { swagsApi } from "./swagsApi";

/*Requires authentication via token to be passed through the api*/
const userSlice = createSlice({
  name: "useSlice",
  initialState: {
    user: null,
    token: null,
    reservations: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, token: payload.token };
      },
    );
    builder.addMatcher(
      userApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, token: payload.token };
      },
    );
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          user: payload,
        };
      },
    );
    builder.addMatcher(
      swagsApi.endpoints.updateSwag.matchFulfilled,
      (state, { payload }) => {
        state.user.swags.push(payload.swag);
        return state;
      },
    );
    builder.addMatcher(
      userApi.endpoints.reserveSwag.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          reservations: payload.reservation,
        };
      },
    );
    builder.addMatcher(
      userApi.endpoints.deleteSwag.matchFulfilled,
      (state, { payload }) => {
        state.user.swags = state.user.swags.filter(
          (swag) => swag.id !== payload.deletedSwag.id,
        );
        return state;
      },
    );
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
