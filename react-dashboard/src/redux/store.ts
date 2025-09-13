import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../service/categoryApi';
import { variantApi } from '../service/variantApi';
import { productApi } from '../service/productApi';
import { uploadApi } from '../service/uploadApi';
import { userApi } from '../service/userApi';
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      variantApi.middleware,
      productApi.middleware,
      uploadApi.middleware,
      userApi.middleware,
    ),
});
