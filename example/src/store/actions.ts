// tslint:disable: no-console
import { tap } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchNewestCount(ctx: ICtx, d: number) {
  return ctx.curAction$.pipe();
}

export function fetchRepurl(ctx: ICtx, a: string): any {
  return ctx.curAction$.pipe(tap((x) => {
    x.type === 'fetchNewestCount' && x.payload
  }));
}
