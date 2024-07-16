import {
  getUser,
  userReducer,
  registerUser,
  loginUser,
  updateUser,
  logout,
  checkAuth,
  checkIsAuth,
  clearError
} from './user-slice';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

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
    const state = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: { email: 'qwe@test.ru', name: 'asd' } }
    });
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: { email: 'qwe@test.ru', name: 'asd' }
    });
  });

  it('test get user pending', () => {
    const state = userReducer(initialState, {
      type: getUser.pending.type
    });
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('test get user rejected', () => {
    const state = userReducer(initialState, {
      type: getUser.rejected.type,
      error: { message: 'failed get user' }
    });

    expect(state).toEqual({
      ...initialState,
      error: 'failed get user',
      isLoading: false
    });
  });

  it('test check is auth', () => {
    const state = userReducer(initialState, checkIsAuth());
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('test register user', () => {
    const state = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user: { email: 'qwe@test.ru', name: 'asd' } }
    });

    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: { email: 'qwe@test.ru', name: 'asd' }
    });
  });

  it('test register user pending', () => {
    const state = userReducer(initialState, {
      type: registerUser.pending.type
    });
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('test register user rejected', () => {
    const state = userReducer(initialState, {
      type: registerUser.rejected.type,
      error: { message: 'failed register user' }
    });
    expect(state).toEqual({
      ...initialState,
      error: 'failed register user',
      isLoading: false
    });
  });

  it('test login user', () => {
    const state = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { email: 'qwe@test.ru', name: 'asd' }
    });
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: { email: 'qwe@test.ru', name: 'asd' }
    });
  });

  it('test login user pending', () => {
    const state = userReducer(initialState, {
      type: loginUser.pending.type
    });
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('test login user rejected', () => {
    const state = userReducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: 'failed login user' }
    });
    expect(state).toEqual({
      ...initialState,
      error: 'failed login user',
      isLoading: false
    });
  });

  it('test update user', () => {
    const state = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: { email: 'qwe@test.ru', name: 'sad' } }
    });
    expect(state).toEqual({
      ...initialState,
      isAuthenticated: true,
      isAuthChecked: true,
      user: { email: 'qwe@test.ru', name: 'sad' }
    });
  });

  it('test update user pending', () => {
    const state = userReducer(initialState, {
      type: updateUser.pending.type
    });
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('test update user rejected', () => {
    const state = userReducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: 'failed update user' }
    });
    expect(state).toEqual({
      ...initialState,
      error: 'failed update user',
      isLoading: false
    });
  });

  it('test logout', () => {
    const state = userReducer(initialState, {
      type: logout.fulfilled.type
    });
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: false
    });
  });

  it('test clear error', () => {
    const state = userReducer(
      { ...initialState, error: 'some error' },
      clearError()
    );
    expect(state).toEqual({ ...initialState, error: null });
  });
});
