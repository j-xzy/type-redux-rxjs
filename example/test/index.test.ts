import * as Mock from 'mockjs';
import { applyMiddleware, createStore } from 'type-redux';
import { createRxjsMiddleware } from 'type-redux-rxjs';
import * as actions from '../store/actions';
import * as mutations from '../store/mutations';

(window as any).setTimeout = (callback: any) => {
  callback();
};

it('', async () => {
  Mock.mock('https://api.github.com/users/whj1995/repos', []);

  const initialState = {
    count: 0,
    repUrl: '',
    loading: ''
  };

  const reducers = { mutations, actions };

  const store = createStore(initialState, reducers, applyMiddleware(createRxjsMiddleware(actions)));

  expect(store.getState().count).toBe(0);

  await store.dispatch('fetchCount');
});
