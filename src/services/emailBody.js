import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emailListEndpoint = "https://flipkart-email-mock.vercel.app/";

export const emailBodyApi = createApi({
  reducerPath: "emailBodyApi",
  baseQuery: fetchBaseQuery({ baseUrl: emailListEndpoint }),
  endpoints: (builder) => ({
    getEmailBody: builder.query({
      query: (id) => `/?id=${id}`,
    }),
  }),
});

export const { useGetEmailBodyQuery } = emailBodyApi;
