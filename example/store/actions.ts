// tslint:disable: no-console
import { interval, merge, Observable, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, switchMap, switchMapTo, take, takeUntil, tap } from 'rxjs/operators';
import { ICtx } from './index';

export function fetchCount(ctx: ICtx<number>, _d: number): any {
  const cancel$ = merge(ctx.createAction$('cancel'), interval(5000)).pipe(
    switchMapTo(throwError('error'))
  );

  const act$: Observable<any> = ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'fetching...')),
    switchMapTo(
      ajax.getJSON<string>('https://api.github.com/users/whj1995/repos')
        .pipe(
          tap((result: any) => {
            console.log(typeof result);
            ctx.dispatch('sett', result.length);
          }),
          takeUntil(cancel$)
        )
    ),
    tap((e) => ctx.commit('loading', e)),
    switchMap(() => act$),
    catchError(() => act$)
  );
  return act$;
}

export function sett(ctx: ICtx<number>, _: number) {
  return ctx.curAction$.pipe(tap((d) => {
    ctx.commit('set', d);
  }));
}

export function cancel(ctx: ICtx<any>, _d: string) {
  return ctx.curAction$.pipe(
    tap(() => ctx.commit('loading', 'canel'))
  );
}
