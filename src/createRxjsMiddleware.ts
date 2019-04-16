import { merge, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const createRxjsMiddleware: (actions: TypeRedux.IActions<any, any, any>) => TypeRedux.IMiddleware = (actions) => (store) => {
  const allActs = [];
  const action$ = new Observable();
  store.context.action$ = action$;

  for (const key in actions) {
    if (actions.hasOwnProperty(key)) {
      const curAct$ = action$.pipe(
        filter((action: any) => action.type === key)
      );
      store.context.curAction$ = curAct$;
      allActs.push(actions[key](store.context, undefined));
    }
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
