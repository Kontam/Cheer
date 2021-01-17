import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { createStore, combineReducers } from 'redux';
import { reducer, reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import GridSettingFields from '../index';
import { ScreenSettingFormData } from '../../../types';

export default {
  title: 'molecules/GridSettingFields',
  decorators: [withKnobs],
};

const reducers = combineReducers({
  form: reducer,
});

const store = createStore(reducers);
const formActiveCell = [1, 2, 3, 4];
const formValues: ScreenSettingFormData = {
  mode: 'GRID',
  conveyorAmount: 3,
  conveyorOverflow: false,
  conveyorLimit: 10,
  gridOverflow: false,
  gridLimit: 10,
};
const overflowFormValues: ScreenSettingFormData = {
  mode: 'GRID',
  conveyorAmount: 3,
  conveyorOverflow: true,
  conveyorLimit: 10,
  gridOverflow: true,
  gridLimit: 10,
};

const Component = () => (
  <form>
    <GridSettingFields
      formValues={formValues}
      onFormActiveCellClick={action('onFormActiveCellClick')}
      onFormInactiveCellClick={action('onFormActiveCellClick')}
      formActiveCell={formActiveCell}
    />
  </form>
);
const overflowComponent = () => (
  <form>
    <GridSettingFields
      formValues={overflowFormValues}
      onFormActiveCellClick={action('onFormActiveCellClick')}
      onFormInactiveCellClick={action('onFormActiveCellClick')}
      formActiveCell={formActiveCell}
    />
  </form>
);
const ReduxForm = reduxForm({ form: 'story', initialValues: formValues })(
  Component
);
const OverflowReduxForm = reduxForm({
  form: 'story',
  initialValues: overflowFormValues,
})(overflowComponent);

export const Default = () => (
  <BackGround>
    <Provider store={store}>
      <ReduxForm />
    </Provider>
  </BackGround>
);

export const Overflow = () => (
  <BackGround>
    <Provider store={store}>
      <OverflowReduxForm />
    </Provider>
  </BackGround>
);
const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 500px;
  padding: 50px;
`;
