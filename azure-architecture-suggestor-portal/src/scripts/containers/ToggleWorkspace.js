import React, { Component } from 'react';
import {Link as ScrollLink} from 'react-scroll';

import '../../styles/ToggleWorkspace.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        workspace: 'Architecture'
    }
    this.toggleWorkspace = this.toggleWorkspace.bind(this);
  }

  toggleWorkspace() {
      let workspace = this.state.workspace.toLowerCase() === 'architecture' ? 'Questions' : 'Architecture'
      this.setState(() => ({
        workspace
      }));
  }

  render() {
    return (
        <ScrollLink 
            to={`${this.state.workspace.toLowerCase()}-container`} 
            smooth={true} 
            duration={100}
        >
            <button 
                value = {this.state.workspace}
                onClick = {this.toggleWorkspace}
                id = 'toggle-workspace'
            >
                {this.state.workspace}
            </button>
        </ScrollLink>
    );
  }
}