import {useState} from 'react';
import {NewsHeadLinesApiCall, apiCall} from './Api';
import {data} from '../constants/data';

interface Article {
  publishedAt: string;
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  id: number;
  content: string;
}
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

const useFetchNewsHeadLines = (
  apiCall: (params: Params) => Promise<ApiDataResponse>,
  initialParams: Params,
) => {
  const [data_H, setData_H] = useState<Article[]>([]);
  const [isLoading_H, setIsLoading_H] = useState(false);
  const [Error_H, setError_H] = useState<String | null>(null);

  const fetchH_Data = async (params: Params = initialParams) => {
    setIsLoading_H(true);
    try {
      const response = await NewsHeadLinesApiCall(params);

      if (response.status == 'ok') {
        const articles = response.articles;
        const filteredData = articles.map((item, index) => ({
          publishedAt: item.publishedAt,
          imageUrl: item.urlToImage,
          title: item.title,
          description: item.description,
          author: item.author || 'Unknown', // Handle potential null author
          id: index + 1, // Assuming index + 1 is a suitable unique id
          content: item.content,
        }));
        setData_H(filteredData);
      } else {
        console.error('API call failed:', response.status);
        setError_H(response.status || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      setError_H(error.message || 'Unknown error');
    } finally {
      setIsLoading_H(false);
    }
  };
  return {data_H, Error_H, isLoading_H, fetchH_Data};
};

export default useFetchNewsHeadLines;
