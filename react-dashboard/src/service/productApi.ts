import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FileResDto } from '../interface/file-res';
import { CategoryRes } from './categoryApi';
export interface Product {
  page: number;
  limit: number;
  total: number;
  data: ProductRes[];
}

export interface ProductRes {
  id: number;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  isSales: boolean;
  isPurchase: boolean;
  isExpenses: boolean;
  isPointOfSale: boolean;
  isSubscriptions: boolean;
  isRental: boolean;
  productType: string;
  quantityOnHand: number;
  salesPrice: number;
  soldQuantity: number;
  category: CategoryRes;
  image: FileResDto;
  variants: VariantRes[];
}

export interface VariantRes {
  id: number;
  name: string;
  values: ValueRes[];
}

export interface ValueRes {
  id: number;
  name: string;
  color: string;
}
export interface CreateProductReq {
  name: string;
  description: string;
  sku: string;
  barcode: string;
  isSales: boolean;
  isPurchase: boolean;
  isExpenses: boolean;
  isPointOfSale: boolean;
  isSubscriptions: boolean;
  isRental: boolean;
  productType: string;
  quantityOnHand: number;
  salesPrice: number;
  soldQuantity: number;
  categoryId: number;
  variants: {
    attributeId: number;
    valueId: number;
  }[];
  image: {
    type: string;
    size: number;
    name: string;
    extension: string;
    path: string;
  };
}

export interface UpdateProductReq {
  name: string;
  description: string;
  sku: string;
  barcode: string;
  isSales: boolean;
  isPurchase: boolean;
  isExpenses: boolean;
  isPointOfSale: boolean;
  isSubscriptions: boolean;
  isRental: boolean;
  productType: string;
  quantityOnHand: number;
  salesPrice: number;
  soldQuantity: number;
  categoryId: number;
  variants?: {
    attributeId: number;
    valueId: number;
  }[];
  images?: {
    type: string;
    size: number;
    name: string;
    extension: string;
    path: string;
  };
}
export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/inventory-service',

    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product, any>({
      query: (params: ProductRes) => ({
        url: 'products',
        method: 'GET',
        params,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateProductReq }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    createProduct: builder.mutation({
      query: (data: CreateProductReq) => ({
        url: 'products',
        method: 'POST',
        body: data,
      }),
    }),
    getProductById: builder.query<ProductRes, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'GET',
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApi;
