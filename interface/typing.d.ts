/// <reference types="type-redux" />
import { Observable } from "rxjs";

declare global {
  namespace TypeRedux {

    type ValueOf<T> = T[keyof T];

    type IAction$<A extends IActions<any, any, A>> = ValueOf<{
      [key in keyof A]: {
        type: key;
        payload: Parameters<A[key]>[1];
      }
    }>

    interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
      action$: Observable<IAction$<A>>;
      curAction$: Observable<IAction$<A>>;
    }
  }
}
