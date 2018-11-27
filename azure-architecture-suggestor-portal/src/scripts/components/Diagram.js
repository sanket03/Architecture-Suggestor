import React, { Component } from 'react';
import ArchitectureLayerBox from './ArchitectureLayerBox';

export default class Diagram extends Component {

  constructor(props) {
    super(props);
    this.renderGroupBox = this.renderGroupBox.bind(this);
  }

  renderGroupBox(architectureDetails) {
    let element = []
    for(let group in architectureDetails) {
      element.push(      
        <ArchitectureLayerBox
        key = {group}
        groupData = {architectureDetails[group]}
        show = {architectureDetails[group].isActive}
        />
      )
    }
    return element;
  }

  render() {
    return (
      <div id = 'diagram-container'>
        <div id = 'diagram-wrapper'>
          {this.renderGroupBox(this.props.architectureDetails)}
        </div>
      </div>
    );
  }
}
