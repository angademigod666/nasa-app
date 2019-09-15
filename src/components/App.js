import React from 'react';

import Navbar from './Navbar';
import Home from './Home';
import MarsRover from './MarsRover';
import APOD from './APOD';
import InSight from './InSight';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <Router className="App">
      <Navbar />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/apod" component={APOD} />
          <Route exact path="/inSight" component={InSight} />
          <Route exact path="/marsRover" component={MarsRover} />
          <Route exact path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </div>
      {/* <footer className='navbar navbar-expand-md bg-dark navbar-dark'>
      
      </footer> */}
    </Router>
  );
}

export default App;
