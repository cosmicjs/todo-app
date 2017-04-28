import React from 'react';
import { connect } from 'react-redux';
import Task from './Task';
import { postNewTask } from '../redux/reducers/reducer';

const Header = (props) => {
  return (
    <header id="header">
      <div className="content container text-center">
        <h1>To-Do App!</h1>
        <form onSubmit={evt => {
          evt.preventDefault();
          props.postNewTask(evt.target.taskName.value);
          evt.target.taskName.value = "";
        }
        }>
          <div className="form-group">
            <label for="exampleInputEmail1">Add New To-Do</label>
            <input className="form-control input-lg" name="taskName" placeholder="Enter new task" />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </header>
  );
};


const mapDispatch = {postNewTask};
export default connect(null, mapDispatch)(Header);
