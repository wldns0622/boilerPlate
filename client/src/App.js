import './App.css';
import React from 'react';
import {Switch, Route} from 'react-router-dom'

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import auth from './hoc/auth';

function App() {
  return (
  <>
    <Switch>
      <Route exact path="/" component={auth(LandingPage, null)} />
      <Route path="/login" component={auth(LoginPage, false)} />
      <Route path="/register" component={auth(RegisterPage, false)} />
    </Switch>
  </>
  )
}

export default App;
