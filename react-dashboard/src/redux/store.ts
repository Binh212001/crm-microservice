import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../service/categoryApi';
import { variantApi } from '../service/variantApi';
import { productApi } from '../service/productApi';
import { uploadApi } from '../service/uploadApi';
import { userApi } from '../service/userApi';
import { leadApi } from '../service/leadApi';
import { orderApi } from '../service/orderApi';
import { settingApi } from '../service/settingApi';
import { authApi } from '../service/authApi';
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      variantApi.middleware,
      productApi.middleware,
      uploadApi.middleware,
      userApi.middleware,
      leadApi.middleware,
      orderApi.middleware,
      settingApi.middleware,
      authApi.middleware,
    ),
});
