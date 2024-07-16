import { getUserOrders, userOrdersReducer } from './user-orders-slice';

const initialState = {
  orders: [],
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

describe('Test user-orders slice', () => {
  it('test get user orders', () => {
    const state = userOrdersReducer(initialState, {
      type: getUserOrders.fulfilled.type,
      payload: orders
    });
    expect(state).toEqual({ ...initialState, orders });
  });
});
