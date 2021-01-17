import React from 'react';
import { reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import ScreenSettingComponent from '../ScreenSetting';
import { ScreenSettingFormData } from '../../../types';
import { SystemMessage } from '../../../../redux/modules/types';

export default {
  title: 'organisms/ScreenSetting',
  decorators: [withKnobs],
};

const reducers = combineReducers({
  form: reducer,
});

const store = createStore(reducers);
const formActiveCell = [1, 2, 3, 4];
const formValuesConveyor: ScreenSettingFormData = {
  mode: 'CONVEYOR',
  conveyorAmount: 3,
  conveyorOverflow: true,
  conveyorLimit: 10,
  gridOverflow: true,
  gridLimit: 10,
};
const formValuesGrid: ScreenSettingFormData = {
  mode: 'GRID',
  conveyorAmount: 3,
  conveyorOverflow: true,
  conveyorLimit: 10,
  gridOverflow: true,
  gridLimit: 10,
};

export const Conveyor = () => {
  const systemMessage: SystemMessage = {
    message: text('message', 'message text'),
    showing: boolean('hasMessage', false),
  };
  return (
    <Provider store={store}>
      <Window>
        <ScreenSettingComponent
          formActiveCell={formActiveCell}
          handleSubmit={action('slackInfoForm')}
          formValues={formValuesConveyor}
          initialiValues={formValuesConveyor}
          onFormActiveCellClick={action('onFormActiveCellClick')}
          onFormInactiveCellClick={action('onFormInactiveCellClick')}
          onHideMessage={action('onHideMessage')}
          systemMessage={systemMessage}
        />
      </Window>
    </Provider>
  );
};

export const Grid = () => {
  const systemMessage: SystemMessage = {
    message: text('message', 'message text'),
    showing: boolean('hasMessage', false),
  };
  return (
    <Provider store={store}>
      <Window>
        <ScreenSettingComponent
          formActiveCell={formActiveCell}
          handleSubmit={action('slackInfoForm')}
          formValues={formValuesGrid}
          initialiValues={formValuesGrid}
          onFormActiveCellClick={action('onFormActiveCellClick')}
          onFormInactiveCellClick={action('onFormInactiveCellClick')}
          onHideMessage={action('onHideMessage')}
          systemMessage={systemMessage}
        />
      </Window>
    </Provider>
  );
};

const Window = styled.div`
  background-color: #f490a7;
  width: 500px;
  height: 500px;
`;
