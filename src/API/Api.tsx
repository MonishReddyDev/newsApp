import axios from 'axios';
import {getPreviousDate} from '../common/common';

const API_key = '39ebedf4c93949068f47f5060fd998d1';
const API_URL = `https://newsapi.org/v2/everything?`;
const API_URL_HL = `https://newsapi.org/v2/top-headlines?`;

interface ApiDataResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

interface Params {
  [key: string]: any;
}

let date = getPreviousDate();

const formatUrl = (params: Record<string, any>): string => {
  let url = `${API_URL}from=${date}&to=${date}&sortBy=popularity&apiKey=${API_key}`;

  if (params && typeof params === 'object') {
    const queryParams = Object.keys(params).reduce((acc, key) => {
      const value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
      return `${acc}&${key}=${value}`;
    }, '');
    url += queryParams;
  }
  // console.log('Final URL:', url);
  return url;
};

export const apiCall = async (params: Params): Promise<ApiDataResponse> => {
  try {
    const response = await axios.get<ApiDataResponse>(formatUrl(params));
    return response.data;
  } catch (error: any) {
    console.error('API call error:', error.message);
    throw new Error(error.message);
  }
};

const formatHeadLinesURL = (params: Record<string, any>) => {
  let url = `${API_URL_HL}apiKey=${API_key}`;
  if (params && typeof params === 'object') {
    const queryParams = Object.keys(params).reduce((acc, key) => {
      const value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
      return `${acc}&${key}=${value}`;
    }, '');

    url += queryParams;
  }
  console.log('Final URL:', url);
  return url;
};

export const NewsHeadLinesApiCall = async (
  params: Params,
): Promise<ApiDataResponse> => {
  try {
    const response = await axios.get(formatHeadLinesURL(params));
    return response.data;
  } catch (error: any) {
    console.error('API call error:', error.message);
    throw new Error(error.message);
  }
};
