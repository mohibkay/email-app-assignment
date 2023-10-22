import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emailListEndpoint = "https://flipkart-email-mock.vercel.app/";

export const emailListApi = createApi({
  reducerPath: "emailListApi",
  baseQuery: fetchBaseQuery({ baseUrl: emailListEndpoint }),
  endpoints: (builder) => ({
    getEmailList: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetEmailListQuery } = emailListApi;
