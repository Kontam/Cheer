import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useSelector, useDispatch } from 'react-redux';
import { getFormValues } from 'redux-form';
import ScreenSettingPresentational from './ScreenSetting';
import appConst from '../../../modules/constants/appConst';
import {
  PreferenceState,
  SettingsState,
  FormActiveCell,
  SystemMessage,
} from '../../../redux/modules/types';
import { autofillPreference } from '../../../redux/preferenceRedux/modules/reduxForm';
import {
  readSettingConfig,
  writeSettingConfig,
} from '../../../redux/effects/config';
import {
  addFormActiveCell,
  removeFormActiveCell,
} from '../../../redux/modules/settings/pages/formActiveCell';
import { ScreenSettingFormData } from '../../types';
import {
  hideSystemMessage,
  showSystemMessage,
} from '../../../redux/modules/common/systemMessage';

const ScreenSetting = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readSettingConfig());
  }, [dispatch]);

  const setting = useSelector<PreferenceState, SettingsState>(
    (state) => state.settings
  );
  // 設定ファイルロードのあとのタイミングでformに値を入れるのでinitialValuesを使わない
  useEffect(() => {
    dispatch(autofillPreference(setting));
  }, [setting, dispatch]);

  // フォームの現在入力値
  const formValues = useSelector<PreferenceState, any>((state) =>
    getFormValues(appConst.FORM_SCREEN_SETTING)(state)
  );
  // ActiveCellフォームの入力値
  const formActiveCell = useSelector<PreferenceState, FormActiveCell>(
    (state) => state.pages.formActiveCell
  );
  const systemMessage = useSelector<PreferenceState, SystemMessage>(
    (state) => state.common.systemMessage
  );
  const onFormActiveCellClick = (cellNum: number) => {
    dispatch(removeFormActiveCell(cellNum));
  };
  const onFormInactiveCellClick = (cellNum: number) => {
    dispatch(addFormActiveCell(cellNum));
  };

  // 初期設定フォーム送信
  const handleSubmit = (values: ScreenSettingFormData) => {
    const settingsState: SettingsState = {
      mode: {
        screen: values.mode,
      },
      screen: {
        horizonConveyor: {
          amount: Number(values.conveyorAmount),
          overflow: values.conveyorOverflow,
          queueLimit: values.conveyorLimit,
        },
        grid: {
          activeCell: formActiveCell,
          overflow: values.gridOverflow,
          queueLimit: values.gridLimit,
        },
      },
    };
    dispatch(writeSettingConfig(settingsState));
    ipcRenderer.send(appConst.IPC_REQUEST_PREFERENCE, settingsState);
  };
  // snackbar
  const onHideMessage = () => {
    dispatch(hideSystemMessage());
  };
  ipcRenderer.on(appConst.IPC_RESPONCE_PREFERENCE, () => {
    dispatch(showSystemMessage('Successfully saved'));
  });

  return (
    <ScreenSettingPresentational
      handleSubmit={handleSubmit}
      formValues={formValues}
      formActiveCell={formActiveCell}
      onFormActiveCellClick={onFormActiveCellClick}
      onFormInactiveCellClick={onFormInactiveCellClick}
      onHideMessage={onHideMessage}
      systemMessage={systemMessage}
    />
  );
};

export default ScreenSetting;
