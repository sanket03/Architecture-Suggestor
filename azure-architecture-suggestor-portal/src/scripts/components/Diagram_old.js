import React, { Component } from 'react';
import ArchitectureLayerBox from './ArchitectureLayerBox';

export default class Diagram extends Component {

  constructor(props) {
    super(props);
    this.renderGroupBox = this.renderGroupBox.bind(this);
  }

  // Checks whether the group should be rendered or not
  shouldRenderGroup(groupQuestionsObj, questionResponseMap) {
    let allQuestionsInactive = true;
    // Check if all the questions are inactive
    for(let questionObj of groupQuestionsObj) {
      if(questionObj.isActive) {
        allQuestionsInactive = false;
      }
    }

    // Check for question Ids in question Response map
    if(allQuestionsInactive) {
      return true;
    } else {
      for(let questionObj of groupQuestionsObj) {
        if(questionObj.id in questionResponseMap) {
          return true
        }
      }
    }
    return false;
  }
  
  renderGroupBox(architectureDetails, questionDetails, questionResponseMap) {
    let element = []
    for(let group in architectureDetails) {
      if(this.shouldRenderGroup(questionDetails[group], questionResponseMap))
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
          {this.renderGroupBox(this.props.architectureDetails, this.props.questionDetails, this.props.questionResponseMap)}
        </div>
      </div>
    );
  }
}
