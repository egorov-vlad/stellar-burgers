import {
  getFeeds,
  feedReducer,
  feedInitialState,
  resetFeed
} from './feed-slice';

const payload = {
  orders: [
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
    },
    {
      _id: '66962e9d119d45001b4f926b',
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-16T08:26:05.196Z',
      updatedAt: '2024-07-16T08:26:05.617Z',
      number: 45939
    }
  ],
  total: 2,
  totalToday: 2,
  isLoading: false
};

describe('Test feed slice', () => {
  it('get feeds', () => {
    const newState = feedReducer(feedInitialState, {
      type: getFeeds.fulfilled.type,
      payload
    });
    expect(newState).toEqual(payload);
  });

  it('reset feed', () => {
    const newState = feedReducer(feedInitialState, {
      type: resetFeed.type
    });
    expect(newState).toEqual(feedInitialState);
  });
});
