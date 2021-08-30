import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import {
    BrowserRouter as Router,
    Switch,
    Route,
   // Link
  } from "react-router-dom";
import App from './App.js';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path = '/login' component = {Login}/>
                <Route exact path = '/register' component = {Register} />
                <Route exact path = '/' component = {App} />
            </Switch>
        </Router>
    )
}

export default Routes;