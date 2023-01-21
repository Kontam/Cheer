/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { PreferenceState } from '../../modules/types';
import createPreferenceReducer from '../modules/reducer';
import { preferenceSaga } from '../modules/saga';

const preferenceReducer = createPreferenceReducer();

const configurePreferenceStore = (
  initialState: Partial<PreferenceState> = {}
) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(preferenceReducer, initialState, enhancer);
  sagaMiddleware.run(preferenceSaga);

  if (module.hot) {
    module.hot.accept(
      '../modules/reducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../modules/reducer').default)
    );
  }

  return store;
};

export default configurePreferenceStore;
