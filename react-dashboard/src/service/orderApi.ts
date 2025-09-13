import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Order Status Enum
export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

// Order Interfaces
export interface Order {
  page: number;
  limit: number;
  total: number;
  data: OrderRes[];
}

export interface OrderRes {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingPostalCode: string;
  status: OrderStatus;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  notes: string;
  orderDate: Date;
  shippedDate: Date;
  deliveredDate: Date;
  createdAt: Date;
  updatedAt: Date;
  orderLines: OrderLineRes[];
}

export interface OrderReq {
  page?: number;
  limit?: number;
  order?: string;
  orderNumber?: string;
  customerName?: string;
  customerEmail?: string;
  status?: OrderStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateOrderReq {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostalCode: string;
  billingAddress?: string;
  billingCity?: string;
  billingCountry?: string;
  billingPostalCode?: string;
  status?: OrderStatus;
  shippingAmount?: number;
  notes?: string;
  orderLines: CreateOrderLineReq[];
}

export interface UpdateOrderReq {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  billingAddress?: string;
  billingCity?: string;
  billingCountry?: string;
  billingPostalCode?: string;
  status?: OrderStatus;
  shippingAmount?: number;
  notes?: string;
  orderLines?: CreateOrderLineReq[];
}

// Order Line Interfaces
export interface OrderLineRes {
  id: number;
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderLineReq {
  productId: number;
  variantId?: number;
  variantName?: string;
  quantity: number;
  price: number;
  total: number;
}

// Product interface (referenced from inventory service)
export interface ProductRes {
  id: number;
  name: string;
  description?: string;
  price?: number;
  // Add other product fields as needed
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/order-service',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Order endpoints
    getOrders: builder.query<Order, any>({
      query: (params: OrderReq) => ({
        url: 'orders',
        method: 'GET',
        params,
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<OrderRes, number>({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation({
      query: (data: CreateOrderReq) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateOrderReq }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: OrderStatus }) => ({
        url: `orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  // Order hooks
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
