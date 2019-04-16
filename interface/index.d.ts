/// <reference types="type-redux" />

declare namespace TypeRedux {
  interface IContext<S, M extends IMutations<S>, A extends IActions<S, M, A>> {
    action$: any;
    curAction$: any;
  }
}
