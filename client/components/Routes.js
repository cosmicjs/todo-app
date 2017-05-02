import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Home from './Home';
import { getAllTasks } from '../redux/reducers/reducer';

const Routes = ({getAllTasks}) => {
  return (
    <Router history={browserHistory}>
        <Route path="/" component={Home} onEnter={getAllTasks} />
    </Router>
  )
};

const mapState = ({tasks}) => ({tasks});
const mapDispatch = {getAllTasks};

export default connect(mapState, mapDispatch)(Routes);