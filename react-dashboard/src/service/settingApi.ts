import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Setting Key Enum
export enum SettingKeyEnum {
  EMAIL = 'email',
  APP = 'app',
  THEME = 'theme',
  NOTIFICATION = 'notification',
  SECURITY = 'security',
  INTEGRATION = 'integration',
}

// Base Setting Interfaces
export interface SettingRes {
  id: string;
  key: string;
  value: any;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface CreateSettingReq {
  key: SettingKeyEnum;
  value: any;
  description?: string;
}

export interface UpdateSettingReq {
  value: any;
  description?: string;
}

// App Settings Interface
export interface AppSettings {
  appName: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  maintenanceMode: boolean;
  debugMode: boolean;
  autoBackup: boolean;
  backupInterval: number; // in hours
  maxFileSize: number; // in MB
  sessionTimeout: number; // in minutes
  enableNotifications: boolean;
  enableAuditLog: boolean;
  enableAnalytics: boolean;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  currencySymbol: string;
}

// Email Settings Interface
export interface EmailSettings {
  port: number;
  email: string;
  replyTo: string;
  password: string;
  username: string;
}

// Theme Settings Interface
export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  mode: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: number; // in px
  density: 'compact' | 'comfortable' | 'spacious';
  enableAnimations: boolean;
  enableRipple: boolean;
  enableTransitions: boolean;
  customCSS?: string;
  logoUrl?: string;
  faviconUrl?: string;
  sidebarWidth: number;
  headerHeight: number;
  footerHeight: number;
}

// Notification Settings Interface
export interface NotificationSettings {
  enablePushNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enableInAppNotifications: boolean;
  notificationSound: boolean;
  notificationFrequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    timezone: string;
  };
  notificationTypes: {
    orderUpdates: boolean;
    leadUpdates: boolean;
    opportunityUpdates: boolean;
    systemAlerts: boolean;
    securityAlerts: boolean;
    maintenanceAlerts: boolean;
  };
}

// Security Settings Interface
export interface SecuritySettings {
  enableTwoFactor: boolean;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
  enableIPWhitelist: boolean;
  allowedIPs: string[];
  enableSessionTimeout: boolean;
  sessionTimeoutMinutes: number;
  enableAuditLog: boolean;
  auditLogRetentionDays: number;
  enableDataEncryption: boolean;
  encryptionKey?: string;
}

// Integration Settings Interface
export interface IntegrationSettings {
  enableAPILogging: boolean;
  apiRateLimit: number; // requests per minute
  enableCORS: boolean;
  allowedOrigins: string[];
  enableWebhooks: boolean;
  webhookSecret?: string;
  enableThirdPartyIntegrations: boolean;
  integrations: {
    paymentGateway: {
      enabled: boolean;
      provider: string;
      apiKey?: string;
      secretKey?: string;
    };
    smsProvider: {
      enabled: boolean;
      provider: string;
      apiKey?: string;
      secretKey?: string;
    };
    cloudStorage: {
      enabled: boolean;
      provider: string;
      accessKey?: string;
      secretKey?: string;
      bucketName?: string;
    };
  };
}

// Settings Response Wrapper
export interface SettingsResponse {
  success: boolean;
  data: SettingRes;
  message?: string;
}

// Settings List Response
export interface SettingsListResponse {
  success: boolean;
  data: SettingRes[];
  total: number;
  message?: string;
}

// Bulk Update Request
export interface BulkUpdateSettingsReq {
  settings: Array<{
    key: SettingKeyEnum;
    value: any;
  }>;
}

// Test Email Request
export interface TestEmailReq {
  to: string;
  subject: string;
  message: string;
}

// Setting API
export const settingApi = createApi({
  reducerPath: 'settingApi',
  tagTypes: ['Setting'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/setting-service',
    prepareHeaders: (headers) => {
      // Add authentication headers if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get setting by key
    getSettingByKey: builder.query<SettingsResponse, SettingKeyEnum>({
      query: (key) => ({
        url: `settings/${key}`,
        method: 'GET',
      }),
      providesTags: (_, __, key) => [{ type: 'Setting', id: key }],
    }),

    // Update setting by key
    updateSettingByKey: builder.mutation<
      SettingsResponse,
      { key: SettingKeyEnum; data: UpdateSettingReq }
    >({
      query: ({ key, data }) => ({
        url: `settings/${key}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { key }) => [
        { type: 'Setting', id: key },
        'Setting',
      ],
    }),
  }),
});

// Export hooks
export const { useGetSettingByKeyQuery, useUpdateSettingByKeyMutation } =
  settingApi;
