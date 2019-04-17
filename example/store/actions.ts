// tslint:disable: no-console
import { tap } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchNewestCount(ctx: ICtx<any>, _d: number) {
  return ctx.curAction$.pipe(
    tap((payload) => console.log(payload))
  );
}

// export function fetchRepurl(ctx: ICtx<any>, a: string): any {
//   return ctx.curAction$.pipe(
//     tap((payload) => console.log(payload))
//   );
// }
