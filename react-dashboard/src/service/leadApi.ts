import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Lead Status Enum
export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  CONVERTED = 'CONVERTED',
}

// Opportunity Status Enum
export enum OpportunityStatus {
  QUALIFIED = 'QUALIFIED',
  QUATATION_SENT = 'QUATATION_SENT',
  NEGOTIATED = 'NEGOTIATED',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

// Lead Interfaces
export interface Lead {
  page: number;
  limit: number;
  total: number;
  data: LeadRes[];
}

export interface LeadRes {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  department?: string;
  position?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
  products: ProductRes[];
}

export interface LeadReq {
  page?: number;
  limit?: number;
  order?: string;
  name?: string;
  email?: string;
  company?: string;
  status?: string;
}

export interface CreateLeadReq {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  department?: string;
  position?: string;
  status?: LeadStatus;
  leadLines?: LeadLineReq[];
}

export interface UpdateLeadReq {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  company?: string;
  department?: string;
  position?: string;
  status?: LeadStatus;
  leadLines?: LeadLineReq[];
}

export interface LeadLineReq {
  id: number;
  quantity?: number;
}

// Opportunity Interfaces
export interface Opportunity {
  page: number;
  limit: number;
  total: number;
  data: OpportunityRes[];
}

export interface OpportunityRes {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  department: string;
  position: string;

  status: OpportunityStatus;
  leadId: number;
  createdAt: Date;
  updatedAt: Date;
  products: ProductRes[];
}

export interface OpportunityReq {
  page?: number;
  limit?: number;
  order?: string;
  name?: string;
  email?: string;
  company?: string;
  status?: string;
  leadId?: number;
}

export interface CreateOpportunityReq {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  company: string;
  department?: string;
  position?: string;
  status?: OpportunityStatus;
  leadId?: number;
  opportunityLines: CreateOpportunityLineReq[];
}

export interface UpdateOpportunityReq {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  company?: string;
  department?: string;
  position?: string;
  status?: OpportunityStatus;
  leadId?: number;
  opportunityLines?: CreateOpportunityLineReq[];
}

export interface CreateOpportunityLineReq {
  productId: number;
  quantity?: number;
  price?: number;
  variantAttribute?: string;
  variantValue?: string;
  total?: number;
}

// Product interface (referenced from inventory service)
export interface ProductRes {
  id: number;
  name: string;
  description?: string;
  price?: number;
  // Add other product fields as needed
}

export const leadApi = createApi({
  reducerPath: 'leadApi',
  tagTypes: ['Lead', 'Opportunity'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/lead-service',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Lead endpoints
    getLeads: builder.query<Lead, any>({
      query: (params: LeadReq) => ({
        url: 'leads',
        method: 'GET',
        params,
      }),
      providesTags: ['Lead'],
    }),
    getLeadById: builder.query<LeadRes, number>({
      query: (id) => ({
        url: `leads/${id}`,
        method: 'GET',
      }),
      providesTags: ['Lead'],
    }),
    createLead: builder.mutation({
      query: (data: CreateLeadReq) => ({
        url: 'leads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Lead'],
    }),
    updateLead: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateLeadReq }) => ({
        url: `leads/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Lead'],
    }),
    updateLeadStatus: builder.mutation({
      query: ({ id, status }: { id: number; status: LeadStatus }) => ({
        url: `leads/${id}/${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Lead'],
    }),
    deleteLead: builder.mutation({
      query: (id) => ({
        url: `leads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lead'],
    }),

    // Opportunity endpoints
    getOpportunities: builder.query<Opportunity, any>({
      query: (params: OpportunityReq) => ({
        url: 'opportunities',
        method: 'GET',
        params,
      }),
      providesTags: ['Opportunity'],
    }),
    getOpportunityById: builder.query<OpportunityRes, number>({
      query: (id) => ({
        url: `opportunities/${id}`,
        method: 'GET',
      }),
      providesTags: ['Opportunity'],
    }),
    createOpportunity: builder.mutation({
      query: (data: CreateOpportunityReq) => ({
        url: 'opportunities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Opportunity'],
    }),
    updateOpportunity: builder.mutation({
      query: ({ id, data }: { id: number; data: UpdateOpportunityReq }) => ({
        url: `opportunities/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Opportunity'],
    }),
    deleteOpportunity: builder.mutation({
      query: (id) => ({
        url: `opportunities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Opportunity'],
    }),
  }),
});

export const {
  // Lead hooks
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useUpdateLeadStatusMutation,
  useDeleteLeadMutation,
  // Opportunity hooks
  useGetOpportunitiesQuery,
  useGetOpportunityByIdQuery,
  useCreateOpportunityMutation,
  useUpdateOpportunityMutation,
  useDeleteOpportunityMutation,
} = leadApi;
