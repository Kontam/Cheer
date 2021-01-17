import React from 'react';
import { reduxForm, reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { text, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import TextFieldComponent from '../index';

export default {
  title: 'atoms/TextField',
  decorators: [withKnobs],
};

const Component = () => (
  <form>
    <TextFieldComponent
      name="field"
      placeholder={text('placeholder', 'placeholder')}
    />
  </form>
);
const ReadonlyComponent = () => (
  <form>
    <TextFieldComponent
      name="field"
      placeholder={text('placeholder', 'placeholder')}
      disabled="disabled"
    />
  </form>
);

const Reduxform = reduxForm({ form: 'story' })(Component);
const ReadonlyReduxform = reduxForm({ form: 'story' })(ReadonlyComponent);

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
      <ReadonlyReduxform />
    </Provider>
  </BackGround>
);

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
  padding: 50px;
`;
