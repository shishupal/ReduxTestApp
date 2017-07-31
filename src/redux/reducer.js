import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import notifs from './modules/notifs';
import counter from './modules/counter';
import info from './modules/info';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    online: (v = true) => v,
    notifs,
    counter: multireducer({
      counter1: counter,
      counter2: counter,
      counter3: counter
    }),
    info,
    ...asyncReducers
  });
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
