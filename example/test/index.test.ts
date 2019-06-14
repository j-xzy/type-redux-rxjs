import { applyMiddleware, createStore } from 'type-redux';
import { createRxjsMiddleware } from 'type-redux-rxjs';
import * as actions from '../store/actions';
import * as mutations from '../store/mutations';

jest.mock('rxjs/ajax');

it('', async () => {

  const initialState = {
    count: 0,
    repUrl: '',
    loading: ''
  };

  const reducers = { mutations, actions };

  const store = createStore(initialState, reducers, applyMiddleware(createRxjsMiddleware(actions)));

  expect(store.getState().count).toBe(0);

  await store.dispatch('fetchCount');

  expect(store.getState().count).toBe(3);
});
