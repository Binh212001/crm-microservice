import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FileResDto } from '../interface/file-res';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/bunny-cloud-service',
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    uploadSingle: builder.mutation<FileResDto, File>({
      query: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: 'upload-single',
          method: 'POST',
          body: formData,
        } as const;
      },
    }),
  }),
});

export const { useUploadSingleMutation } = uploadApi;
