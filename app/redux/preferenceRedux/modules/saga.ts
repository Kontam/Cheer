import { all } from 'redux-saga/effects';
import { preferenceReduxFormSagas } from './reduxForm';
import { configSagas } from '../../effects/config';

export function* preferenceSaga() {
  yield all([...preferenceReduxFormSagas, ...configSagas]);
}
