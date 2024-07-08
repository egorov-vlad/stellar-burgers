import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TInitialState = {
  bun: TConstructorIngredient | null;
  sleetedIngredients: TConstructorIngredient[];
};

const initialState: TInitialState = {
  bun: null,
  sleetedIngredients: []
};

const constructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState: initialState,
  selectors: {
    selectSleetedIngredients: (state) => state.sleetedIngredients,
    selectSelectedBun: (state) => state.bun
  },
  reducers: {
    addSleetedIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.sleetedIngredients = [
          ...state.sleetedIngredients,
          action.payload
        ];
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();

        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    removeSleetedIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.sleetedIngredients = state.sleetedIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.sleetedIngredients = [];
    },
    moveUpSleetedIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.sleetedIngredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        const temp = state.sleetedIngredients[index - 1];
        state.sleetedIngredients[index - 1] = action.payload;
        state.sleetedIngredients[index] = temp;
      }
    },
    moveDownSleetedIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.sleetedIngredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.sleetedIngredients.length - 1) {
        const temp = state.sleetedIngredients[index + 1];
        state.sleetedIngredients[index + 1] = action.payload;
        state.sleetedIngredients[index] = temp;
      }
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const {
  addBun,
  addSleetedIngredient,
  removeSleetedIngredient,
  resetConstructor,
  moveUpSleetedIngredient,
  moveDownSleetedIngredient
} = constructorSlice.actions;

export const { selectSleetedIngredients, selectSelectedBun } =
  constructorSlice.selectors;
