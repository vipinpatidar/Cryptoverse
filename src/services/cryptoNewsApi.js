import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeader = {
  "X-BingApis-SDK": "true",
  "x-rapidapi-key": "35f55ebd04msh0943c77f4cee285p15722fjsn04f6b09a2e24",
  "x-rapidapi-host": "real-time-news-data.p.rapidapi.com",
};
const newsApiUrl = "https://real-time-news-data.p.rapidapi.com";

const createRequest = (endpoint) => ({ url: endpoint, headers: newsApiHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: newsApiUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `https://real-time-news-data.p.rapidapi.com/search?query=${newsCategory}&limit=${count}&time_published=anytime&country=US&lang=en`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
