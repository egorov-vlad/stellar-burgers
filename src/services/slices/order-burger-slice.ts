import { orderBurgerApi } from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  ingredients: string[];
  order: TOrder | null;
  isLoading: boolean;
};

export const orderBurgerInitialState: TInitialState = {
  ingredients: [],
  order: null,
  isLoading: false
};

export const sendOrderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState: orderBurgerInitialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    },
    resetIngredients: (state) => {
      state.ingredients = [];
    }
  },
  selectors: {
    selectOrderBurgerOrder: (state) => state.order,
    selectOrderBurgerIngredients: (state) => state.ingredients,
    selectOrderBurgerIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.ingredients = action.payload.order.ingredients;
        state.isLoading = false;
      })
      .addCase(sendOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendOrderBurger.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const orderBurgerReducer = orderBurgerSlice.reducer;
export const {
  selectOrderBurgerIsLoading,
  selectOrderBurgerIngredients,
  selectOrderBurgerOrder
} = orderBurgerSlice.selectors;
export const { resetOrder, resetIngredients } = orderBurgerSlice.actions;
