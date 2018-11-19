import React, { Component } from 'react';
import Header from '../components/Header';

import '../../styles/App.scss'

export default class App extends Component {

  constructor() {
    super();

    // Binding context to methods
    this.selectArchitectureType = this.selectArchitectureType.bind(this);
  }

  selectArchitectureType() {
    let selectedNode = this.selectedNode.current.value;
    this.setState({
      selectedSolutionId: selectedNode
    });
  }

  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}
