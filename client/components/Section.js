import React, {Component} from 'react';
import {connect} from 'react-redux';
import Task from './Task';

class Section extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id="one" className="wrapper style2 special flow">
        <header className="major">
          <h2>Let's get some work done!</h2>
        </header>
        {
          this.props.tasks && this.props.tasks.map((task) => {
            console.log("TASKSKSKS", task);
            return (
              <Task key={task._id} Obj={task} isComplete={task.metafields[0].value} Name={task.title}/>
            )
          })
        }
      </section>
    );
  }

}
;

const mapState = ({tasks}) => ({tasks});
export default connect(mapState)(Section);