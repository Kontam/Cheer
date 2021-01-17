import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { PreferenceState } from '../../modules/types';
import createPreferenceReducer from '../modules/reducer';
import { preferenceSaga } from '../modules/saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);
const preferenceReducer = createPreferenceReducer();

function configureStore(initialState?: PreferenceState): Store {
  const store = createStore(preferenceReducer, initialState, enhancer);
  sagaMiddleware.run(preferenceSaga);
  return store;
}

export default configureStore;
