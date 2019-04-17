// tslint:disable: no-console
import { ajax } from 'rxjs/ajax';
import { filter, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchCount(ctx: ICtx<number>, _d: number): any {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'fetching...')),
    mergeMap(
      () => ajax.getJSON('https://api.github.com/users/whj1995/repos')
        .pipe(
          tap((result: any) => ctx.commit('set', result.length)),
          takeUntil(ctx.action$.pipe(
            filter((t) => t.type === 'cancel')
          ))
        )
    )
  );
}

export function cancel(ctx: ICtx<any>, a: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
}
