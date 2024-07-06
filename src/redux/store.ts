// src/store/store.ts
import {configureStore} from '@reduxjs/toolkit';
import FetchReducer from './newsfetchSlice';
import fetchHeadlines from './newsHeadLinesSlice';

export const store = configureStore({
  reducer: {
    news: FetchReducer,
    headlinesNews: fetchHeadlines,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
