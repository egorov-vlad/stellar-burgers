import { getOrdersApi } from '@api';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  isLoading: boolean;
};

export const userOrdersInitialState: TInitialState = {
  orders: [],
  isLoading: false
};

export const getUserOrders = createAsyncThunk(
  'userOrder/getOrders',
  getOrdersApi
);

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState: userOrdersInitialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectUserOrdersIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const userOrdersReducer = userOrderSlice.reducer;
export const { selectUserOrders, selectUserOrdersIsLoading } =
  userOrderSlice.selectors;
