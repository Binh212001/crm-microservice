import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface VariantRes {
  page: number;
  limit: number;
  total: number;
  data: VariantData[];
}

export interface VariantData {
  id: number;
  name: string;
  values: ValueRes[];
}

export interface ValueRes {
  id: number;
  name: string;
  color: string;
}

export interface CreateVariantReq {
  name: string;
  values: {
    name: string;
    color?: string;
  }[];
}

export interface UpdateVariantReq {
  name: string;
  values: {
    name: string;
    color?: string;
  }[];
}

export const variantApi = createApi({
  reducerPath: 'variantApi',
  tagTypes: ['Variant'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/inventory-service',

    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVariants: builder.query<VariantRes, any>({
      query: (params) => ({
        url: 'variants',
        method: 'GET',
        params,
      }),
    }),
    createVariant: builder.mutation({
      query: (data: CreateVariantReq) => ({
        url: 'variants',
        method: 'POST',
        body: data,
      }),
    }),
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `variants/${id}`,
        method: 'DELETE',
      }),
    }),
    updateVariant: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateVariantReq }) => ({
        url: `variants/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetVariantsQuery,
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} = variantApi;
