import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import ApplyScreen from './screens/apply.screen';
import CandidatesScreen from './screens/candidates.screen';

import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Header />
          <Switch>
            <Route path="/apply" exact component={ApplyScreen} />
            <Route path="/candidates" exact component={CandidatesScreen} />
            <Redirect path="*" to="/apply" />
          </Switch>
    </BrowserRouter>
  );
}

export default App;
