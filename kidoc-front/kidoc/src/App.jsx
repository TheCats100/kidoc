import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import FirstName from './components/firstname/FirstName';
import ParentsForm from './components/parents/ParentsForm';
import ProfilBar from './components/profilbar/ProfilBar';
import BadgeList from './components/badges/BadgeList';
import ToDoList from './components/to-do-list/ToDoList';
import Home from './components/home/Home';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route component={ParentsForm} exact path="/parents" />
          <Route component={FirstName} exact path="/connect" />
          <Route component={Home} exact path="/" />
          <Route exact path="/badges">
            <ProfilBar />
            <BadgeList />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
