import React from 'react';
import { connect } from 'react-redux';
import { putChangeStatus, deleteTask } from '../redux/reducers/reducer';

const Task = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={() => {
            props.putChangeStatus(props.Obj, props.isComplete)}} className="btn">{props.isComplete ? "Undo" : "Complete" }</button>
          <button type="button" onClick={() => props.deleteTask(props.Obj.slug)} className="btn">Delete</button>
        </div>
        <h3 style={{textDecoration: props.isComplete ? "line-through" : "none"}}>{props.Name}</h3>
      </div>
    </div>
  );
};

const mapDispatch = {putChangeStatus, deleteTask};
export default connect(null, mapDispatch)(Task);