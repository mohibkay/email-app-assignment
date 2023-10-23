import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const emailListEndpoint = "https://flipkart-email-mock.vercel.app/";

export const emailDetailsApi = createApi({
  reducerPath: "emailDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: emailListEndpoint }),
  endpoints: (builder) => ({
    getEmailDetails: builder.query({
      query: (id) => `/?id=${id}`,
    }),
  }),
});

export const { useGetEmailDetailsQuery } = emailDetailsApi;
