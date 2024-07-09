import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async (_, { dispatch }) => {
    const data = await getFeedsApi();
    if (data.success) {
      dispatch(resetFeed());
    }

    return data;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {
    resetFeed: () => initialState
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday,
    selectFeedIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getFeeds.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedIsLoading
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
export const { resetFeed } = feedSlice.actions;
