import {useState} from 'react';


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

const useFetchData = (
  apiCall: (params: Params) => Promise<ApiDataResponse>,
  initialParams: Params,
) => {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState<String | null>(null);

  const fetchData = async (params: Params = initialParams) => {
    setIsLoading(true);
    try {
      const response = await apiCall(params);

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
        setData(filteredData);
      } else {
        console.error('API call failed:', response.status);
        setError(response.status || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      setError(error.message || 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };
  return {data, Error, isLoading, fetchData};
};

export default useFetchData;
