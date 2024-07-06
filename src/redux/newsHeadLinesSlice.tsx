import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {NewsHeadLinesApiCall} from '../API/Api';
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
  headlinesArticles: Article[];

  status: boolean | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  headlinesArticles: [],
  status: false,

  error: null,
};

export const fetchNewsHeadLines = createAsyncThunk(
  'newsheadlines/fetchNewsHeadlines',
  async ({q, pageSize}: {q: string; pageSize: number}) => {
    try {
      const params = {
        q,
        pageSize,
      };
      const data = await NewsHeadLinesApiCall(params);
      //   console.log('articles:', data);
      return data.articles;
    } catch (error: any) {
      console.error('Fetch news error:', error.message);
      throw error;
    }
  },
);

const headlinesNewsSlice = createSlice({
  name: 'newsheadlines',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsHeadLines.pending, state => {
        state.status = true;
      })
      .addCase(fetchNewsHeadLines.fulfilled, (state, action) => {
        state.status = true;
        console.log('executed2');
        (state.headlinesArticles = action.payload.map((item, index) => ({
          publishedAt: item.publishedAt,
          imageUrl: item.urlToImage,
          title: item.title,
          description: item.description,
          author: item.author || 'Unknown', // Handle potential null author
          id: index + 1, // Assuming index + 1 is a suitable unique id
          content: item.content,
        }))),
          (state.status = false);
      })
      .addCase(fetchNewsHeadLines.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default headlinesNewsSlice.reducer;

// Selectors
export const selectAllHeadlines = (state: RootState) =>
  state.headlinesNews.headlinesArticles;
export const getHeadlinesStatus = (state: RootState) =>
  state.headlinesNews.status;
export const getHeadlinesError = (state: RootState) =>
  state.headlinesNews.error;
export const getCurrentPage = (state: RootState) => state.headlinesNews.page;
