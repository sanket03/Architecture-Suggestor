import React, { Component } from 'react';
import Header from './Header';
import ArchitectureSolution from './ArchitectureSolution';
import Workspace from './Workspace'
import {solutionsList, filterAzureIdentityMapping, architectureDataObj, questionsObj} from '../utilities/data';

import '../../styles/App.scss'

export default class App extends Component {

  constructor() {
    super();

    // Setting State
    this.state = {
      selectedSolutionId: '1'
    }

    // Creating a Ref
    this.selectedNode = React.createRef();

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
        <ArchitectureSolution 
          selectRef={this.selectedNode}
          selectArchitectureType= {this.selectArchitectureType}
        />
        <Workspace 
          architectureDataObj={solutionsList[this.state.selectedSolutionId]} 
          filterAzureIdentityMapping={filterAzureIdentityMapping}
          questionsObj={questionsObj[this.state.selectedSolutionId]}
          />
      </>
    );
  }
}
