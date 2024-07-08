import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

export interface IUserState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    if (!response.success) {
      return;
    }

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    return response.user;
  }
);

//TODO: maybe needed check susses response
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => updateUserApi(data)
);

export const logout = createAsyncThunk('user/logout', logoutApi);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      await dispatch(getUser());
    }
    dispatch(checkIsAuth());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    checkIsAuth: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectUserIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const userReducer = userSlice.reducer;
export const { checkIsAuth, clearError } = userSlice.actions;
export const {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectUser,
  selectUserIsLoading,
  selectError
} = userSlice.selectors;
