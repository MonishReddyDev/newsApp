import axios from 'axios';
import {getPreviousDate} from '../common/common';

const API_key = 'apiKey';
const API_URL = `https://newsapi.org/v2/everything?`;
const API_URL_HL = `https://newsapi.org/v2/top-headlines?`;

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

export const apiCall = async (params: Record<string, any>) => {
  try {
    const response = await axios.get(formatUrl(params));
    const {data} = response;

    if (data.status === 'ok') {
      return {success: true, data: data};
    } else {
      console.error('API call returned an error status:', data);
      return {success: false, msg: 'API call returned an error status'};
    }
  } catch (error: any) {
    console.error('API call error:', error.message);
    return {success: false, msg: error.message};
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

export const headLinesApicall = async (params: Record<string, any>) => {
  try {
    const response = await axios.get(formatHeadLinesURL(params));
    const {data} = response;
    if (data.status === 'ok') {
      return {success: true, data: data};
    } else {
      console.error('API call returned an error status:', data);
      return {success: false, msg: 'API call returned an error status'};
    }
  } catch (error: any) {
    console.error('API call error:', error.message);
    return {success: false, msg: error.message};
  }
};
