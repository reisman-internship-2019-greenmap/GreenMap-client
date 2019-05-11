import React, { Component } from 'react';
import Scanner from './components/scanner';

export default class App extends Component {
  render() {
      return (
          <Scanner />
    )} //end render
} //end App

//TODO: implement stack naviagtion
//Write dummy response screen
//See if you can navigate to that screen upon receiving a response from the server
//Need to pass response props from Scanner --> App --> Results
