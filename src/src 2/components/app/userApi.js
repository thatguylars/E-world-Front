import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    /*This route is used to create a new user account. 
    On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.*/
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
    }),
    /*This route is used for a user to login when they already have an account. 
    On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.*/
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
    }),
    /*This route is used to grab an already logged in user's relevant data. 
    It is mostly helpful for verifying the user has a valid token (and is thus logged in) and displaying account details. 
    You must pass a valid token with this request, or it will be rejected.*/
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
    /*This route returns a list of books the current user has checked out. 
    You must pass a valid token with this request, or it will be rejected.*/
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
    /*A request to this endpoint will attempt to delete an existing reservation and update a book's availability. 
    You must pass a valid token with this request, or it will be rejected.*/
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
