import store from './store';
import { ingredientsInitialState } from './slices/ingredients-slice';
import { feedInitialState } from './slices/feed-slice';
import { orderBurgerInitialState } from './slices/order-burger-slice';
import { userInitialState } from './slices/user-slice';
import { userOrdersInitialState } from './slices/user-orders-slice';
import { orderInitialState } from './slices/order-slice';
import { constructorInitialState } from './slices/constructor-slice';

describe('Test root reducers init in store', () => {
  it('should return initial state', () => {
    expect(store.getState()).toStrictEqual({
      ingredients: ingredientsInitialState,
      feed: feedInitialState,
      orderBurger: orderBurgerInitialState,
      order: orderInitialState,
      user: userInitialState,
      userOrder: userOrdersInitialState,
      ingredientsConstructor: constructorInitialState
    });
  });
});
