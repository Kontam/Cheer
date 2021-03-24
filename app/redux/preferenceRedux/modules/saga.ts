import { all } from 'redux-saga/effects';
import { preferenceReduxFormSagas } from './reduxForm';
import { configSagas } from '../../effects/config';
import { electronSagas } from '../../effects/electron';

export function* preferenceSaga() {
  yield all([...preferenceReduxFormSagas, ...configSagas, ...electronSagas]);
}
