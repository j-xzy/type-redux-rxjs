// tslint:disable: no-console
import { ajax } from 'rxjs/ajax';
import { mergeMap, takeUntil, tap, throttleTime, take, switchMap, takeWhile, map, switchMapTo } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchCount(ctx: ICtx<number>, _d: number): any {
  const a$: any = ctx.curAction$.pipe(
    take(1),
    tap(() => ctx.commit('loading', 'fetching...')),
    switchMapTo(
      ajax.getJSON('https://api.github.com/users/whj1995/repos')
        .pipe(
          tap((result: any) => ctx.dispatch('sett', result.length)),
          switchMap(() => a$),
          takeUntil(ctx.createAction$('cancel').pipe(tap((x) => console.log(x))))
        )
    )
  );
  return a$;
}

export function sett(ctx: ICtx<number>, _: number) {
  return ctx.curAction$.pipe(tap((d) => ctx.commit('set', d)));
}

export function cancel(ctx: ICtx<any>, _d: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
}
