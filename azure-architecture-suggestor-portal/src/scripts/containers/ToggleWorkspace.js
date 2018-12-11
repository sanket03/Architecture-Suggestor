import React, { Component } from 'react';
import {Link as ScrollLink} from 'react-scroll';

import '../../styles/ToggleWorkspace.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        workspace: 'Architecture'
    }

    this.onScrollHandler = this.onScrollHandler.bind(this);
    this.toggleWorkspace = this.toggleWorkspace.bind(this);
    window.addEventListener('scroll', this.onScrollHandler);
  }

  onScrollHandler() {
      let windowHeight = window.innerHeight;
      let docHeight = document.body.scrollHeight;
      let scrollTop = window.pageYOffset;
      let scrollLength = docHeight - windowHeight;
      let pctScrolled = Math.floor(scrollTop/scrollLength * 100);
      let workspace = pctScrolled >= 50 ? 'Questions' : 'Architecture';
      this.setState(() => ({
        workspace
      }));
  }


  toggleWorkspace() {
      this.onScrollHandler()
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