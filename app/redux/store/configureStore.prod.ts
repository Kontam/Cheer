import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../modules/reducer';
import RootSaga from '../modules/saga';
import { RootState } from '../modules/types';
import { desktopIntegrationMiddleware } from '../middlewares/desktopIntegrationMiddleware';

// Renderer IPC Handler

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(
  sagaMiddleware,
  router,
  desktopIntegrationMiddleware
);

function configureStore(initialState?: RootState): Store {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(RootSaga);
  return store;
}

export default { configureStore, history };
