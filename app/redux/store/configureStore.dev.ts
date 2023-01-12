/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { RootState } from '../modules/types';
import createRootReducer from '../modules/reducer';
import rootSaga from '../modules/saga';
import { desktopIntegrationMiddleware } from '../middlewares/desktopIntegrationMiddleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (obj: Record<string, any>) => any;
  }
  interface NodeModule {
    hot?: {
      accept: (path: string, cb: () => void) => void;
    };
  }
}

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = (initialState: Partial<RootState> = {}) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  // redux-saga Middleware
  middleware.push(sagaMiddleware);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);
  middleware.push(desktopIntegrationMiddleware);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(
      '../modules/reducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../modules/reducer').default)
    );
  }

  return store;
};

export default { configureStore, history };
