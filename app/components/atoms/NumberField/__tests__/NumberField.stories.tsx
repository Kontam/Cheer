import React from 'react';
import { number } from '@storybook/addon-knobs';
import { reduxForm, reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import NumberFieldComponent from '../index';
import { QA_ATTRIBUTES } from '../../../../modules/testUtil/testAttributes';

export default {
  title: 'atoms/NumberField',
};

const Component = () => (
  <form>
    <NumberFieldComponent
      name="field"
      max={number('max', 10)}
      min={number('min', 0)}
      exAttributes={QA_ATTRIBUTES.SCREEN_AMOUNT_FIELD}
    />
  </form>
);
const DisabledComponent = () => (
  <form>
    <NumberFieldComponent
      name="field"
      max={number('max', 10)}
      min={number('min', 0)}
      disabled
      exAttributes={QA_ATTRIBUTES.SCREEN_AMOUNT_FIELD}
    />
  </form>
);

const Reduxform = reduxForm({ form: 'story' })(Component);
const DisabledReduxform = reduxForm({ form: 'story' })(DisabledComponent);

const reducers = combineReducers({
  form: reducer,
});
const store = createStore(reducers);

export const Default = () => (
  <BackGround>
    <Provider store={store}>
      <Reduxform />
    </Provider>
  </BackGround>
);

export const Disabled = () => (
  <BackGround>
    <Provider store={store}>
      <DisabledReduxform />
    </Provider>
  </BackGround>
);

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
  padding: 50px;
`;
