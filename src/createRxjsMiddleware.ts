import { merge, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

type ICreateRxjsMiddleware = (actions: TypeRedux.IActions<any, any, any>) => TypeRedux.IMiddleware;

export const createRxjsMiddleware: ICreateRxjsMiddleware = (actions) => (store) => {
  const allActs = [];
  const action$ = new Observable<any>();
  store.context.action$ = action$;
  store.context.createAction$ = (type: any) => action$.pipe(
    filter((act: any) => act.type === type),
    map((act) => act.payload)
  );

  // tslint:disable-next-line: forin
  for (const key in actions) {
    const curAct$ = action$.pipe(
      filter((act: any) => act.type === key),
      map((act) => act.payload)
    );
    store.context.curAction$ = curAct$;
    allActs.push(actions[key](store.context, undefined));
  }

  const mergeOb$ = merge(...allActs);
  const sub$ = new Subject();
  action$.source = sub$;

  const dispatch = store.dispatch;

  const keys = Object.keys(actions);
  store.context.dispatch = store.dispatch = async (type: any, payload: any) => {
    if (keys.includes(type)) {
      sub$.next({ type, payload });
    } else {
      await dispatch(type, payload);
    }
  };

  mergeOb$.subscribe();

  return (next) => (mutation) => {
    return next(mutation);
  };
};
