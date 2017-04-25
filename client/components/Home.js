import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("NEW PROPS", this.props.tasks);
    return (
      <div>
        <NavBar/>
        <Header Tasks={this.props.tasks}/>
        <Footer/>
      </div>
    )
  }
}

const mapState = ({tasks}) => ({tasks});
export default connect(mapState)(Home);