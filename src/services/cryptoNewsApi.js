import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeader = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "35f55ebd04msh0943c77f4cee285p15722fjsn04f6b09a2e24",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};
const newsApiUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (endpoint) => ({ url: endpoint, headers: newsApiHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: newsApiUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
