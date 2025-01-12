import { CreateUserType, LoginUserType } from "@/types/authUserType";
import { ApiResponse } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { decryptData } from "@/utils/crypto";

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const encryptedToken = sessionStorage.getItem("token");
        if (encryptedToken) {
          const token = decryptData(encryptedToken);
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<ApiResponse<CreateUserType>, CreateUserType>({
      query: (formData) => ({
        url: "account/web",
        method: "POST",
        body: formData,
      }),
    }),
    loginUser: builder.mutation<ApiResponse<LoginUserType>, LoginUserType>({
      query: (formData) => ({
        url: "auth",
        method: "POST",
        body: formData,
      }),
    }),
    getUser: builder.query({
      query: (id: string) => `account/${id}`,
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation, useGetUserQuery } =
  authSlice;
