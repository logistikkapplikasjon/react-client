import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';

/**
 * Routes for unauthorized users
 */
const UnauthRouter = () => (
  <Switch key='unauthrouter'>
    <Route exact path='/' component={Header} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={SignUp} />
  </Switch>
);

export default UnauthRouter;
