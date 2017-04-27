import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Section from './Section';
import Footer from './Footer';

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("NEW PROPS", this.props.tasks);
    return (
      <div>
        <Header />
        <Section />
        <Footer/>
      </div>
    )
  }
}

const mapState = ({tasks}) => ({tasks});
export default connect(mapState)(Home);