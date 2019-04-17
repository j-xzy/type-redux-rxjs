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
          takeUntil(ctx.createAction$('cancel').pipe(tap((x) => console.log(x))))
        )
    )
  );
}

export function cancel(ctx: ICtx<any>, _d: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
}
