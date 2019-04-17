/// <reference types="type-redux" />
import { Observable, Observer } from "rxjs";

declare global {
  namespace TypeRedux {

    type ValueOf<T> = T[keyof T];

    type IAction$<A extends IActions<any, any, A>> = ValueOf<{
      [key in keyof A]: {
        type: key;
        payload: Parameters<A[key]>[1];
      }
    }>

    type ICreateAction$<A extends IActions<any, any, A>> = <K extends keyof A>(type: K) => Observable<Parameters<A[K]>[1]>;

    interface IRxContext<S, M extends IMutations<S>, A extends IActions<S, M, A>, T> extends IContext<S, M, A> {
      curAction$: Observable<T>;
      action$: Observable<IAction$<A>>
      createAction$: ICreateAction$<A>;
    }

    interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
      curAction$: Observable<any>;
      action$: Observable<any>;
      createAction$: ICreateAction$<A>;
    }
  }
}
