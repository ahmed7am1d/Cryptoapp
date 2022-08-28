import { CreateApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { createApi } from "@reduxjs/toolkit/dist/query/react";


//[1]-Headers [Object]
const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}
//[2]-BaseUrl
const baseUrl = "https://bing-news-search1.p.rapidapi.com";

//[3]- reqeust link to get the data 
const getrequestFullLink = (url) => ({url,headers:cryptoNewsApiHeaders});

//[3]-Creation of the endpoint 
export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints:(builder) => ({
        //First EndPoint 
        getCryptoNews: builder.query({
            //pass object contains (news category, count)
            query: ({newsCategory, count}) => getrequestFullLink(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
});
// descturcting useGetCryptoNewsQuery from cryptoNewsApi that is automatically generated thanks to redux toolkit
export const {useGetCryptoNewsQuery} = cryptoNewsApi;