# type-redux的Rxjs中间件

[![npm version](https://badge.fury.io/js/type-redux-rxjs.svg)](https://badge.fury.io/js/type-redux-rxjs)

灵感来自 [redux-observable](https://github.com/redux-observable/redux-observable) , 但为type-redux定制。

## 快速开始

1. 安装

```
npm install type-redux-rxjs
```

2. 创建store并定义类型

``` ts
// ./index.ts
import { createRxjsMiddleware } from 'type-redux-rxjs';
import { applyMiddleware, createStore } from 'type-redux';
import * as actions from './actions';
import * as mutations from './mutations';

...

const reducers = { mutations, actions };

export const store = createStore(initialState, reducers, applyMiddleware(createRxjsMiddleware(actions)));

export type ICtx<T> = TypeRedux.IRxContext<IState, typeof reducers['mutations'], typeof reducers['actions'], T>;
```

3. 创建action

``` ts
export function cancel(ctx: ICtx<string>, _: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
```

4. dispatch

``` ts
store.dispatch('cancel')
```

## API

action函数中第一个参数为context

| name | 说明  |
|---|---|
| curAction$ | 当前的action流  |
| action$ | 所有的action流  |
| createAction$ | 创建action流  |