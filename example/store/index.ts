import { applyMiddleware, createStore } from 'type-redux';
import { createRxjsMiddleware } from '../../src';
import * as actions from './actions';
import * as mutations from './mutations';

const initialState = {
  count: 0,
  repUrl: '',
  loading: ''
};

const reducers = { mutations, actions };

export const store = createStore(initialState, reducers, applyMiddleware(createRxjsMiddleware(actions)));

type IState = typeof initialState;
export type IGetState = () => IState;
export type ICtx<T> = TypeRedux.IRxContext<IState, typeof reducers['mutations'], typeof reducers['actions'], T>;
