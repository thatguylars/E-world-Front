import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e-world-backend.onrender.com",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
    }),

    getUser: builder.query({
      query: (token) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    reserveSwag: builder.query({
      query: (token) => ({
        url: "/reservations",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteSwag: builder.mutation({
      query: ({ token, id }) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useReserveSwagQuery,
  useDeleteSwagMutation,
} = userApi;
