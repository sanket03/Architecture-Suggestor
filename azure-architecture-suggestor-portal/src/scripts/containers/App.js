import React, { Component } from 'react';

import Workspace from './Workspace';
import Header from '../components/Header';
import ToggleWorkspace from './ToggleWorkspace';
import ArchitecturesList from '../components/ArchitecturesList'
import ExportDiagram from '../components/ExportDiagram';

import appModule from '../utilities/config';
import serviceModule from '../utilities/serviceCalls';
import Utilities from '../components/Utilities';

import '../../styles/App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.defaultArchitectureId = 11;
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


  async componentDidMount() {
    this.selectArchitecture();
  }

  // Select architecture for which the diagram and questions will be populated
  // Fetch list of architectures and details for a default architecture
  async selectArchitecture() {
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

    let refNode = this.selectedDropdownNode.current;
    let selectedNode =  !refNode ? this.defaultArchitectureId: refNode.value;

    // Fetch architectures List
    this.architecturesList = await serviceModule.fetchData(`${url}${getArchitecturesList}`);

    // Fetch architecture details for a default architecture
    this.architectureDetails[selectedNode] = await serviceModule.fetchData(`${url}${getArchitectureDetails}/${selectedNode}`);

    // Fetch question details for a default architecture
    this.questionDetails[selectedNode] = await serviceModule.fetchData(`${url}${getQuestionDetails}/${selectedNode}`);

    // Fetch question entity mapping
    this.questionEntityMapping = await serviceModule.fetchData(`${url}${getQuestionEntityMapping}`);

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