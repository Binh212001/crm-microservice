import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../service/categoryApi';
import { variantApi } from '../service/variantApi';
import { productApi } from '../service/productApi';
import { uploadApi } from '../service/uploadApi';
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      variantApi.middleware,
      productApi.middleware,
      uploadApi.middleware,
    ),
});
