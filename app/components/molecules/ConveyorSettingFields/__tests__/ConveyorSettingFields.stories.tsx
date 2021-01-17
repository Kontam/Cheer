import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { combineReducers, createStore } from 'redux';
import { reducer, reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import ConveyorSettingFields from '../index';
import { ScreenSettingFormData } from '../../../types';

export default {
  title: 'molecules/ConveyorSettingFields',
  decorators: [withKnobs],
};

const reducers = combineReducers({
  form: reducer,
});

const store = createStore(reducers);
const formValues: ScreenSettingFormData = {
  mode: 'CONVEYOR',
  conveyorAmount: 3,
  conveyorOverflow: false,
  conveyorLimit: 10,
  gridOverflow: false,
  gridLimit: 10,
};
const OverflowFormValues: ScreenSettingFormData = {
  mode: 'CONVEYOR',
  conveyorAmount: 2,
  conveyorOverflow: true,
  conveyorLimit: 8,
  gridOverflow: true,
  gridLimit: 8,
};

const Component = () => (
  <form>
    <ConveyorSettingFields formValues={formValues} />
  </form>
);
const OverflowComponent = () => (
  <form>
    <ConveyorSettingFields formValues={OverflowFormValues} />
  </form>
);

const ReduxForm = reduxForm({ form: 'story', initialValues: formValues })(
  Component
);
const OverflowReduxForm = reduxForm({
  form: 'story',
  initialValues: OverflowFormValues,
})(OverflowComponent);

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
