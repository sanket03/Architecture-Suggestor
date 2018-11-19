import React, { Component } from 'react';

import '../../styles/ArchitectureSolution.scss';
import {solutionsList} from '../utilities/data';

export default class ArchitectureSolution extends Component {

  constructor(props) {
    super(props);
    this.renderSolutionlist = this.renderSolutionlist.bind(this);
  }

  renderSolutionlist(solutionsList) {
    return Object.keys(solutionsList).map(item =>
      <option 
        value = {item} 
        key = {item}>{solutionsList[item]}
      </option>
    )
  }

  render() {
    return (
      <div id = 'filters'>
        <label htmlFor='architecture-solutions'>Solutions</label> <br/>
        <select 
          id='architecture-solutions'
          ref={this.props.selectRef}
          onChange={this.props.selectArchitectureType}
        >
          {this.renderSolutionlist(solutionsList)}
        </select>
      </div>
    );
  }
}
