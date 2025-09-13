import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface User {
  page: number;
  limit: number;
  total: number;
  data: UserRes[];
}
export interface UserRes {
  id: number;
  fullName: string;
  email: string;
  role: string[];
  phone: string;
  address: string;
  avatar: string;
  gender: boolean;
  birthDate: string;
  city: string;
  status: string;
  country: string;
  postalCode: string;
  company: string;
  department: string;
  position: string;
}
export interface UserReq {
  name: string;
  email: string;
  phone: string;
}
export interface CreateUserReq {
  fullName: string;
  email?: string;
  role: string[];
  phone: string;
  address: string;
  avatar: string;
  gender: boolean;
  birthDate: Date;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  department: string;
  position: string;
}
export interface UpdateUserReq {
  fullName?: string;
  email?: string;
  role?: string[];
  phone?: string;
  address?: string;
  avatar?: string;
  gender?: boolean;
  birthDate?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  company?: string;
  department?: string;
  position?: string;
}
export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/user-service',

    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User, any>({
      query: (params: UserReq) => ({
        url: 'users',
        method: 'GET',
        params,
      }),
    }),
    getUserById: builder.query<UserRes, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (data: CreateUserReq) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateUserReq }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
