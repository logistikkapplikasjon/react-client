import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Register from '../containers/Register';
import Profile from '../containers/Profile';
import Edit from '../containers/Edit';
import AddRemove from '../containers/AddRemove';
import List from '../containers/List';
import Login from '../containers/Login';
import Transactions from '../containers/Transactions';

/**
 * Routes for logged in users
 */
const AuthedRouter = () => (
  <Switch key='adminrouter'>
    <Route exact path='/' component={Header} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/register/:type' component={Register} />
    <Route exact path='/edit/:type/:id' component={Edit} />
    <Route exact path='/list/:type' component={List} />
    <Route exact path='/addremove/:option' component={AddRemove} />
    <Route exact path='/transactions' component={Transactions} />
  </Switch>
);

export default AuthedRouter;
