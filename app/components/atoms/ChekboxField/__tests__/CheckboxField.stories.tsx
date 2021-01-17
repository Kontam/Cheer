import React from 'react';
import { reduxForm, reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import CheckboxFieldComponent from '../index';

export default {
  title: 'atoms/CheckboxField',
  decorators: [withKnobs],
};

// todo reduxformのknobsが機能しない
const Component = () => (
  <form>
    <CheckboxFieldComponent name="field" label="checkbox" />
  </form>
);

const Reduxform = reduxForm({ form: 'story' })(Component);

const reducers = combineReducers({
  form: reducer,
});
const store = createStore(reducers);

export const CheckboxField = () => (
  <BackGround>
    <Provider store={store}>
      <Reduxform />
    </Provider>
  </BackGround>
);

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 100%;
  padding: 50px;
`;
