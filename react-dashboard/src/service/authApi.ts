import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Auth Interfaces
export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  fullName: string;
  password: string;
  phone?: string;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ResetPasswordReq {
  token: string;
  password: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyEmailReq {
  token: string;
}

export interface LogoutReq {
  token: string;
}

export interface TokenRes {
  userId: number;
  token: string;
  refreshToken: string;
}

export interface UserRes {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  data: TokenRes;
  message?: string;
}

export interface UserResponse {
  success: boolean;
  data: UserRes;
  message?: string;
}

// Auth API
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/user-service',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<TokenRes, LoginReq>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Register
    register: builder.mutation<AuthResponse, RegisterReq>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Logout
    logout: builder.mutation<{ success: boolean; message: string }, LogoutReq>({
      query: (data) => ({
        url: 'auth/logout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    // Forgot Password
    forgotPassword: builder.mutation<
      { success: boolean; message: string },
      ForgotPasswordReq
    >({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<
      { success: boolean; message: string },
      ResetPasswordReq
    >({
      query: (data) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Change Password
    changePassword: builder.mutation<
      { success: boolean; message: string },
      ChangePasswordReq
    >({
      query: (data) => ({
        url: 'auth/change-password',
        method: 'POST',
        body: data,
      }),
    }),

    // Verify Email
    verifyEmail: builder.mutation<
      { success: boolean; message: string },
      VerifyEmailReq
    >({
      query: (data) => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),

    // Get Current User
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // Refresh Token
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: (data) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Validate Token
    validateToken: builder.query<{ valid: boolean }, void>({
      query: () => ({
        url: 'auth/validate',
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
  useValidateTokenQuery,
} = authApi;

// Auth utility functions
export const authUtils = {
  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Set token in localStorage
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
  },

  // Remove token from localStorage
  removeToken: (): void => {
    localStorage.removeItem('token');
  },

  // Get user from localStorage
  getUser: (): UserRes | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Set user in localStorage
  setUser: (user: UserRes): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Remove user from localStorage
  removeUser: (): void => {
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },

  // Clear all auth data
  clearAuth: (): void => {
    authUtils.removeToken();
    authUtils.removeUser();
  },

  // Get authorization header
  getAuthHeader: (): { Authorization: string } | {} => {
    const token = authUtils.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// Default auth state
export const defaultAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};
