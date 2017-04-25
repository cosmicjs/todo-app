import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import Section from './Section';

export default class Home extends Component {

  render() {
    return (
      <div>
        <Header/>
        <Section/>
        <Footer/>
      </div>
    )
  }
}