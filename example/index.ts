import { store } from './store';

const $ = (selector: string) => document.querySelector(selector);
$('#count')!.innerHTML = store.getState().count + '';
$('#loading')!.innerHTML = store.getState().loading;

store.subscribe(() => {
  const state = store.getState();
  $('#loading')!.innerHTML = state.loading;
  $('#count')!.innerHTML = state.count + '';
});

$('#addone')!.addEventListener('click', () => {
  store.commit('addOne');
});

$('#minusone')!.addEventListener('click', () => {
  store.commit('minusOne');
});

$('#set')!.addEventListener('click', () => {
  store.commit('set', Number(($('#setipt') as any).value));
});

$('#server')!.addEventListener('click', () => {
  store.dispatch('fetchCount', 123);
});

$('#cancel')!.addEventListener('click', () => {
  store.dispatch('cancel');
});
