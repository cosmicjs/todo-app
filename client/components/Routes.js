import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';

const Routes = () => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home}>
          <Route path="/home" component={Home}/>
        </Route>
    </Router>
  )
};

export default connect(null)(Routes);