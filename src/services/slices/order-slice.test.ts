import { getOrderByNumber, orderReducer } from './order-slice';

const initialState = {
  order: null,
  isLoading: false
};

const orders = [
  {
    _id: '66963cb5119d45001b4f9288',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный space фалленианский бургер',
    createdAt: '2024-07-16T09:26:13.956Z',
    updatedAt: '2024-07-16T09:26:14.406Z',
    number: 45940
  }
];

describe('Test order slice', () => {
  it('test get order by number', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders }
    });
    expect(state).toEqual({ ...initialState, order: orders[0] });
  });

  it('test get order by number rejected', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.rejected.type
    });
    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  it('test get order by number pending', () => {
    const state = orderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
});
