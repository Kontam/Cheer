import React from 'react';
import styled from 'styled-components';
import { reduxForm, reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import SelectFieldComponent, { Option } from '../index';
import { QA_ATTRIBUTES } from '../../../../modules/testUtil/testAttributes';

export default {
  title: 'atoms/SelectField',
};

const mockOption: Option[] = [
  {
    label: 'option1',
    value: 'op1',
  },
  {
    label: 'option2',
    value: 'op2',
  },
  {
    label: 'option3',
    value: 'op3',
  },
  {
    label: 'option4',
    value: 'op4',
  },
];

const Component = () => (
  <form>
    <SelectFieldComponent
      name="option"
      options={mockOption}
      exAttributes={QA_ATTRIBUTES.SCREEN_MODE_SELECT}
    />
  </form>
);

const Reduxform = reduxForm({ form: 'story' })(Component);

const reducers = combineReducers({
  form: reducer,
});
const store = createStore(reducers);

export const SelectField = () => (
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
