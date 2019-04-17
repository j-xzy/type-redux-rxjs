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

    // interface IAction<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
    //   (ctx: IRxContext<S, M, A, any>, payload?: any): any;
    //  }

     
    interface IRxContext<S, M extends IMutations<S>, A extends IActions<S, M, A>, T> extends IContext<S, M, A> {
      curAction$: Observable<T>;
      action$: Observable<IAction$<A>>
    }

    interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
      curAction$: Observable<any>;
      action$: Observable<any>;
    }
  }
}
