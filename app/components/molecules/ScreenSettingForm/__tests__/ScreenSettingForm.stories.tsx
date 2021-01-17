import React from 'react';
import { reducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import ScreenSettingFormComponent from '../index';

export default {
  title: 'molecules/ScreenSettingForm',
};

const reducers = combineReducers({
  form: reducer,
});

const store = createStore(reducers);

const formActiveCell = [1, 2, 3, 4];

export const Default = () => (
  <Provider store={store}>
    <BackGround>
      <ScreenSettingFormComponent formActiveCell={formActiveCell} />
    </BackGround>
  </Provider>
);

const BackGround = styled.div`
  background-color: #f490a7;
  height: 500px;
  width: 500px;
`;
