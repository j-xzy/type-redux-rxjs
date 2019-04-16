import { Observable } from "rxjs";

declare namespace TypeRedux {
  interface IContext<S, M extends TypeRedux.IMutations<S>, A extends Ty.IActions<S, M, A>> {
    curAction$: Observable<any>;
    action$:Observable<any>;
  }
}