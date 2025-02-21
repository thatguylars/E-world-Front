import { createSlice } from "@reduxjs/toolkit";
// import { swagsApi } from "./swagApi";
// import { userApi } from "./userApi";

const swagApi = api.injectEndpoints({
  endpoints: (build) => ({
    getsSwag: build.query({
      query: () => "swag",
      providesTags: ["Swag"],
      transformResponse: (response) => response?.swag || [],
    }),
    getSwag: build.query({
      query: (id) => `swag/${id}`,
      providesTags: (result, error, id) => [{ type: "Swag", id }],
    }),
    deleteSwag: build.mutation({
      query: (id) => ({
        url: `swags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Swags", id }],
    }),
    checkoutSwag: build.mutation({
      query: (swagId) => ({
        url: `swags/checkout/${swagId}`,
        method: "POST",
      }),
      invalidatesTags: ["Swags"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSwagQuery,
  useGetSwagsQuery,
  useDeleteSwagMutation,
  useCheckoutSwagMutation,
} = swagApi;

const initialState = {
  swag: [],
  selectedSwagId: null,
  cart: [],
};

const SwagSlice = createSlice({
  name: "swag",
  initialState,
  reducers: {
    setSelectedSwagId: (state, action) => {
      state.selectedSwagId = action.payload;
    },
    addToCart: (state, action) => {
      const swag = action.payload;
      if (!state.cart.some((item) => item.id === swag.id)) {
        state.cart.push(swag);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((swag) => swag.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setSelectedSwagId, addToCart, removeFromCart, clearCart } =
  SwagSlice.actions;

export default SwagSlice.reducer;
export { swagApi };
