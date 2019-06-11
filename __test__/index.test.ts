import { tap } from 'rxjs/operators';
import { applyMiddleware, createStore } from 'type-redux';
import { createRxjsMiddleware } from '../src';

let ob1fn = jest.fn();
let ob2fn = jest.fn();
let ob3fn = jest.fn();

function obserableAct1(ctx, _: string) {
  return ctx.curAction$.pipe(
    tap((param) => ob1fn(param))
  );
}

function obserableAct2(ctx) {
  return ctx.curAction$.pipe(
    tap((param) => ob2fn(param)),
    tap(() => ctx.dispatch('obserableAct1', 'from other act'))
  );
}

function obserableAct3(ctx, _: number) {
  return ctx.createAction$('obserableAct3').pipe(
    tap((param) => ob3fn(param))
  );
}

let store = createStore({ count: 0 }, {
  mutations: {
    mut: () => ({ count: 1 })
  },
  actions: {
    normalAct: () => {/** */ },
    obserableAct1,
    obserableAct2,
    obserableAct3
  }
}, applyMiddleware(createRxjsMiddleware({ obserableAct1, obserableAct2, obserableAct3 })));

beforeEach(() => {
  ob1fn = jest.fn();
  ob2fn = jest.fn();
  ob3fn = jest.fn();

  store = createStore({ count: 0 }, {
    mutations: {
      mut: () => ({ count: 1 })
    },
    actions: {
      normalAct: () => {/** */ },
      obserableAct1,
      obserableAct2
    }
  }, applyMiddleware(createRxjsMiddleware({ obserableAct1, obserableAct2, obserableAct3 })));
});

afterEach(() => {
  ob1fn = null;
  ob2fn = null;
  ob3fn = null;
  store = null;
});

it('curAction$', () => {
  expect(ob1fn.mock.calls.length).toBe(0);
  expect(ob2fn.mock.calls.length).toBe(0);

  store.dispatch('obserableAct1', 'payload');

  expect(ob1fn.mock.calls.length).toBe(1);
  expect(ob2fn.mock.calls.length).toBe(0);
});

it('payload', () => {
  store.dispatch('obserableAct1', 'payload');
  expect(ob1fn.mock.calls[0][0]).toBe('payload');
});

it('createAction$', () => {
  expect(ob3fn.mock.calls.length).toBe(0);

  store.dispatch('obserableAct3', 999);

  expect(ob3fn.mock.calls.length).toBe(1);
  expect(ob3fn.mock.calls[0][0]).toBe(999);
});

it('normalAction', () => {
  store.dispatch('normalAct');
  expect(ob1fn.mock.calls.length).toBe(0);
  expect(ob2fn.mock.calls.length).toBe(0);
});

it('nested dispatch', () => {
  expect(ob1fn.mock.calls.length).toBe(0);
  expect(ob2fn.mock.calls.length).toBe(0);

  store.dispatch('obserableAct2');

  expect(ob1fn.mock.calls.length).toBe(1);
  expect(ob1fn.mock.calls[0][0]).toBe('from other act');
  expect(ob2fn.mock.calls.length).toBe(1);
});

it('mutation', () => {
  expect(store.getState().count).toBe(0);
  store.commit('mut');
  expect(store.getState().count).toBe(1);
});
