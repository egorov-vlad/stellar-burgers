import {
  getUser,
  userReducer,
  registerUser,
  loginUser,
  updateUser,
  logout,
  checkAuth,
  checkIsAuth,
  clearError,
  userInitialState
} from './user-slice';

const loginData = {
  email: 'qwe@test.ru',
  name: 'asd'
};

const userLoginData = { user: { ...loginData } };

describe('Test user slice', () => {
  beforeAll(() => {
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };

    jest.mock('../../utils/cookie', () => ({
      getCookie: jest.fn(),
      setCookie: jest.fn(),
      deleteCookie: jest.fn()
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('test get user', () => {
    const state = userReducer(userInitialState, {
      type: getUser.fulfilled.type,
      payload: userLoginData
    });
    expect(state).toEqual({
      ...userInitialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: loginData
    });
  });

  it('test get user pending', () => {
    const state = userReducer(userInitialState, {
      type: getUser.pending.type
    });
    expect(state).toEqual({ ...userInitialState, isLoading: true });
  });

  it('test get user rejected', () => {
    const state = userReducer(userInitialState, {
      type: getUser.rejected.type,
      error: { message: 'failed get user' }
    });

    expect(state).toEqual({
      ...userInitialState,
      error: 'failed get user',
      isLoading: false
    });
  });

  it('test check is auth', () => {
    const state = userReducer(userInitialState, checkIsAuth());
    expect(state).toEqual({ ...userInitialState, isAuthChecked: true });
  });

  it('test register user', () => {
    const state = userReducer(userInitialState, {
      type: registerUser.fulfilled.type,
      payload: userLoginData
    });

    expect(state).toEqual({
      ...userInitialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: loginData
    });
  });

  it('test register user pending', () => {
    const state = userReducer(userInitialState, {
      type: registerUser.pending.type
    });
    expect(state).toEqual({ ...userInitialState, isLoading: true });
  });

  it('test register user rejected', () => {
    const state = userReducer(userInitialState, {
      type: registerUser.rejected.type,
      error: { message: 'failed register user' }
    });
    expect(state).toEqual({
      ...userInitialState,
      error: 'failed register user',
      isLoading: false
    });
  });

  it('test login user', () => {
    const state = userReducer(userInitialState, {
      type: loginUser.fulfilled.type,
      payload: loginData
    });
    expect(state).toEqual({
      ...userInitialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: loginData
    });
  });

  it('test login user pending', () => {
    const state = userReducer(userInitialState, {
      type: loginUser.pending.type
    });
    expect(state).toEqual({ ...userInitialState, isLoading: true });
  });

  it('test login user rejected', () => {
    const state = userReducer(userInitialState, {
      type: loginUser.rejected.type,
      error: { message: 'failed login user' }
    });
    expect(state).toEqual({
      ...userInitialState,
      error: 'failed login user',
      isLoading: false
    });
  });

  it('test update user', () => {
    const state = userReducer(userInitialState, {
      type: updateUser.fulfilled.type,
      payload: userLoginData
    });

    expect(state).toEqual({
      ...userInitialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: loginData
    });
  });

  it('test update user pending', () => {
    const state = userReducer(userInitialState, {
      type: updateUser.pending.type
    });
    expect(state).toEqual({ ...userInitialState, isLoading: true });
  });

  it('test update user rejected', () => {
    const state = userReducer(userInitialState, {
      type: updateUser.rejected.type,
      error: { message: 'failed update user' }
    });
    expect(state).toEqual({
      ...userInitialState,
      error: 'failed update user',
      isLoading: false
    });
  });

  it('test logout', () => {
    const state = userReducer(userInitialState, {
      type: logout.fulfilled.type
    });
    expect(state).toEqual({
      ...userInitialState,
      isAuthChecked: true,
      isAuthenticated: false
    });
  });

  it('test clear error', () => {
    const state = userReducer(
      { ...userInitialState, error: 'some error' },
      clearError()
    );
    expect(state).toEqual({ ...userInitialState, error: null });
  });
});
