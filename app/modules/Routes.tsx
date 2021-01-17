import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './constants/routes';
import HomePage from '../components/pages/Home';
import WatchScreen from '../components/pages/WatchScreen';
import Login from '../components/pages/Login';
import RecommendBot from '../components/pages/RecommendBot';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.RECOMMEND_BOT} component={RecommendBot} />
      <Route path={routes.WATCH_SCREEN} component={WatchScreen} />
      <Route path={routes.HOME} component={HomePage} />
      <Route path={routes.LOGIN} component={Login} />
    </Switch>
  );
}
