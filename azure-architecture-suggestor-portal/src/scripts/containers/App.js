import React, { Component } from 'react';
import Header from '../components/Header';
import ArchitecturesList from '../components/ArchitecturesList'
import Workspace from './Workspace';
import {solutionsList, architectureDetails, questionEntityMapping, questionDetails} from '../utilities/data';

import '../../styles/App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.architecturesList = {};
    this.architectureDetails = {};
    this.questionDetails = {};
    this.questionEntityMapping = {};

    // Creating a Ref
    this.selectedDropdownNode = React.createRef();

    // Setting initial state
    this.state = {
      architectureId: 1
    }

    // Binding context to methods
    this.selectArchitecture = this.selectArchitecture.bind(this);
  }

  // Fetch list of architectures and details for a default architecture
  componentDidMount() {
    // This should be replaced with fetch API
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(solutionsList);
      }, 2000)
    })

    promise.then(solutionsList => {
      this.architecturesList = solutionsList;

      // Send a call to get details for default architecure Id
      this.architectureDetails = architectureDetails[this.state.architectureId];
      this.questionDetails = questionDetails[this.state.architectureId];
      this.questionEntityMapping = questionEntityMapping;
      this.setState(() => ({
        architectureId: 1
      }))
    })
  }

  selectArchitecture() {
    let selectedNode = this.selectedDropdownNode.current.value;
    console.log(selectedNode);
    // Get data for selected architecture
    this.setState(() => ({
      architectureId: 1
    }))
  }

  render() {
    return (
      <>
        <Header />
        <ArchitecturesList
          architecturesList = {this.architecturesList}
          onchangeHandler = {this.selectArchitecture}
          selectRef = {this.selectedDropdownNode}
        />
        <Workspace 
          architectureDetails = {this.architectureDetails} 
          questionDetails = {this.questionDetails}
          questionEntityMapping = {this.questionEntityMapping}
        />
      </>
    );
  }
}
