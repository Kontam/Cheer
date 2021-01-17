import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import App from './App';
import { configurePreferenceStore } from '../../../redux/preferenceRedux/store/configreStore';

const store = configurePreferenceStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    document.getElementById('preference')
  )
);
