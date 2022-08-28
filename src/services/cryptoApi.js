import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//headrs are API KEY AND HOST 
const cryptoApiHeaders = {
  "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com"
};
//BASE URL USED TO ATTACH TO IT KEY AND HOST 
const baseUrl = 'https://coinranking1.p.rapidapi.com';
//below is function that return object contains url and headers
const creataeRequest = (url) => ({url,headers:cryptoApiHeaders});

//here is the creation of our own api using redux 
//we create endpoints 
//cryptoApi is a function that return the following objects {reducedPath, baseQuery, endpoints=>it is a function}
export const cryptoApi = createApi({
  reducerPath:'cryptoApi',
  baseQuery:fetchBaseQuery({baseUrl}),
  endpoints:(builder) => ({
    //First EndPoint: getExchanges 
    getCryptos: builder.query({
      query:(count) => creataeRequest(`/coins?limit=${count}`),
    }),

    //Second EndPoint: [Get cryptoDetails ]
    getCryptoDetails: builder.query({
      query:(uuid) => creataeRequest(`/coin/${uuid}`)
    }),


  //Third Endpoint: Getting history of a coin 
  getCryptoHistory: builder.query({
    query:({uuid,timePeriod}) => creataeRequest(`/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`)
  }),

  //Fourth enpoint: Getting coin exchanges 
  getCryptoExchanges: builder.query({
    query:() => creataeRequest(`/coin/Qwsogvtv82FCd/exchanges`)
  })

  }),

});

//useGetCryptosQuery is generated automatically by redux and it comes from  = cryptoApi
//naming rules of generating [use] + endpointname + [Query]
export const { 
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery
} = cryptoApi;