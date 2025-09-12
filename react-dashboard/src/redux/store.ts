import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from '../service/categoryApi';
import { variantApi } from '../service/variantApi';
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [variantApi.reducerPath]: variantApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      variantApi.middleware,
    ),
});
