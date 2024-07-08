import { getOrderByNumberApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  order: TOrder | null;
  isLoading: boolean;
};

const initialState: TInitialState = {
  order: null,
  isLoading: false
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectOrder: (state) => state.order,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { selectOrder, selectIsLoading } = orderSlice.selectors;
