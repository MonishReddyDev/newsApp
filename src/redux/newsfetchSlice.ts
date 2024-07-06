import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {apiCall} from '../API/Api';
import {RootState} from './store';

interface Article {
  publishedAt: string;
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  id: number;
  content: string;
}

interface NewsState {
  articles: Article[];
  status: boolean | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  status: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({q, pageSize, page}: {q: string; pageSize: number; page: number}) => {
    try {
      const params = {
        q,
        pageSize,
        page,
      };
      const data = await apiCall(params);
      return data.articles;
    } catch (error: any) {
      console.error('Fetch news error:', error.message);
      throw error;
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, state => {
        state.status = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = true;
        state.articles = action.payload.map((item, index) => ({
          publishedAt: item.publishedAt,
          imageUrl: item.urlToImage,
          title: item.title,
          description: item.description,
          author: item.author || 'Unknown', // Handle potential null author
          id: index + 1, // Assuming index + 1 is a suitable unique id
          content: item.content,
        }));
        state.status = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default newsSlice.reducer;

// Selectors
export const selectAllArticles = (state: RootState) => state.news.articles;
export const getNewsStatus = (state: RootState) => state.news.status;
export const getNewsError = (state: RootState) => state.news.error;
