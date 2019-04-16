// tslint:disable: no-console
import { tap } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchNewestCount(ctx: ICtx) {
  return ctx.curAction$.pipe(tap((x) => { console.log(x); }));
}

export function fetchRepurl(ctx: ICtx) {
  return ctx.curAction$.pipe(tap((x) => console.log(x)));
}
