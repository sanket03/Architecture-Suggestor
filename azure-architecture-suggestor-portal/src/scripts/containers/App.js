import React, { Component } from 'react';
import Header from '../components/Header';
import ArchitecturesList from '../components/ArchitecturesList'
import Utilities from '../components/Utilities';
import Workspace from './Workspace';
import ExportDiagram from '../components/ExportDiagram';
import ToggleWorkspace from './ToggleWorkspace';
import appModule from '../utilities/config';
import serviceModule from '../utilities/serviceCalls';

import {    
  architectureDetails,
  solutionsList,
  questionEntityMapping,
  questionDetails} from '../utilities/data';

import '../../styles/App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.defaultArchitectureId = 10;
    this.architecturesList = {};
    this.architectureDetails = {};
    this.questionDetails = {};
    this.questionEntityMapping = {};

    // Creating a Ref
    this.selectedDropdownNode = React.createRef();

    // Setting initial state
    this.state = {
      architectureId: 0
    }

    // Binding context to methods
    this.selectArchitecture = this.selectArchitecture.bind(this);
  }

  // Fetch list of architectures and details for a default architecture
  async componentDidMount() {
    let {
      url,
      controllers
    } = appModule.appConfig;

    let {
      getArchitecturesList,
      getArchitectureDetails,
      getQuestionDetails,
      getQuestionEntityMapping
    } = controllers;

    // // Fetch architectures List
    // this.architecturesList = await serviceModule.fetchData(`${url}${getArchitecturesList}`);

    // // Fetch architecture details for a default architecture
    // this.architectureDetails[this.defaultArchitectureId] = await serviceModule.fetchData(`${url}${getArchitectureDetails}/${this.defaultArchitectureId}`);

    // // Fetch question details for a default architecture
    // this.questionDetails[this.defaultArchitectureId] = await serviceModule.fetchData(`${url}${getQuestionDetails}/${this.defaultArchitectureId}`);

    // // Fetch question details for a default architecture
    // this.questionEntityMapping = await serviceModule.fetchData(`${url}${getQuestionEntityMapping}`);

    this.architecturesList = solutionsList;
    this.architectureDetails = architectureDetails;
    this.questionDetails = questionDetails;
    this.questionEntityMapping = questionEntityMapping;
    
    this.setState(() => ({
        architectureId:10
      }))
  }

  selectArchitecture() {
    let selectedNode = this.selectedDropdownNode.current.value;
    // Get data for selected architecture
    this.setState(() => ({
      architectureId: selectedNode
    }))
  }

  render() {
    return (
      <>
        <Header />
        {
          this.state.architectureId !== 0 ?                                            
                                            (
                                            <>
                                              <Utilities>
                                                <ArchitecturesList
                                                  architecturesList = {this.architecturesList}
                                                  onchangeHandler = {this.selectArchitecture}
                                                  selectRef = {this.selectedDropdownNode}
                                                />
                                                <ExportDiagram />
                                              </Utilities>
                                              <Workspace 
                                                architectureDetails = {JSON.parse(JSON.stringify(this.architectureDetails[this.state.architectureId].groups))} 
                                                questionDetails = {JSON.parse(JSON.stringify(this.questionDetails[this.state.architectureId].groups))}
                                                questionEntityMapping = {JSON.parse(JSON.stringify(this.questionEntityMapping))}
                                                isInitialized = {false}
                                              />
                                            </>
                                            )
                                          : ''
        }
        <ToggleWorkspace />
      </>
    );
  }
}