import React, { Component } from 'react';
import ArchitectureLayerBox from './ArchitectureLayerBox';

export default class Diagram extends Component {

  constructor(props) {
    super(props);

    this.renderLayerBox = this.renderLayerBox.bind(this);
  }

  renderLayerBox({architectureDataObj}) {
    let element = []
    let levels = architectureDataObj.levels;
    for(let level in levels) {
      element.push(      
        <ArchitectureLayerBox 
        key={level}
        levelData={levels[level]}
        show={levels[level].isActive}
        />
      )
    }
    return element;
  }

  render() {
    return (
      <div id='diagram-container'>
        <div id='diagram-wrapper'>
          {this.renderLayerBox(this.props)}
        </div>
      </div>
    );
  }
}
