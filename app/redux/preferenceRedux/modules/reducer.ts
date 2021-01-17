import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { settingsReducers } from '../../modules/reducer';
import formActiveCell from '../../modules/settings/pages/formActiveCell';
import alert from '../../modules/common/alert';
import systemMessage from '../../modules/common/systemMessage';

export default function createPreferenceReducer() {
  return combineReducers({
    settings: settingsReducers,
    pages: combineReducers({
      formActiveCell,
    }),
    common: combineReducers({
      alert,
      systemMessage,
    }),
    form: formReducer,
  });
}
