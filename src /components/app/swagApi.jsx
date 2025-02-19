import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const swagsApi = createApi({
  reducerPath: "swagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-world-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    /*Returns a list of all swags in the database*/
    getAllSwags: builder.query({
      query: () => "/swags",
    }),
    /*Returns the details of a single book object*/
    getSingleSwag: builder.query({
      query: (id) => `/swags/${id}`,
    }),
    /*Any registered user can update (checkout or return) a swag. 
    You must pass a valid token with this request, or it will be rejected.*/
    updateSwag: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/swags/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllSwagsQuery,
  useGetSingleSwagQuery,
  useUpdateSwagMutation,
} = swagsApi;
