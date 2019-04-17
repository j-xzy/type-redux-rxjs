// tslint:disable: no-console
import { ajax } from 'rxjs/ajax';
import { mergeMap, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchCount(ctx: ICtx<number>, _d: number): any {
  return ctx.curAction$.pipe(
    throttleTime(5000),
    tap(() => ctx.commit('loading', 'fetching...')),
    mergeMap(
      () => ajax.getJSON('https://api.github.com/users/whj1995/repos')
        .pipe(
          tap((result: any) => ctx.dispatch('sett', result.length)),
          takeUntil(ctx.createAction$('cancel').pipe(tap((x) => console.log(x))))
        )
    )
  );
}

export function sett(ctx: ICtx<number>, _: number) {
  return ctx.curAction$.pipe(tap((d) => ctx.commit('set', d)));
}

export function cancel(ctx: ICtx<any>, _d: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
}
