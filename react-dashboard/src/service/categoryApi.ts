import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Category {
  page: number;
  limit: number;
  total: number;
  data: CategoryRes[];
}
export interface CategoryRes {
  id: number;
  name: string;
  description: string;
}
export interface CategoryReq {
  name: string;
  description: string;
}
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/inventory-service',

    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category, any>({
      query: (params: CategoryReq) => ({
        url: 'categories',
        method: 'GET',
        params,
      }),
    }),
    createCategory: builder.mutation({
      query: (data: CategoryReq) => ({
        url: 'categories',
        method: 'POST',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }: { id: number; data: CategoryReq }) => ({
        url: `categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
