import React, { Component } from 'react';

export default class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeQuestion: new Set([1])
    }

    this.setActiveQuestion = this.setActiveQuestion.bind(this);
  }

  renderQuestions(questionObj) {
    let questionCount = 0;
    return Object.keys(questionObj).map(level => 
      questionObj[level].map((obj, index) => {
        questionCount = questionCount + 1;
        return (
          <div 
            key = {index}
            className = { this.state.activeQuestion.has(questionCount) ? 'question' : 'disable question'}
            data-filterid = {questionObj.id}
            data-level = {level}
          >
          <span>{questionCount}.</span>
          <span className = 'question-title'>
            {obj['question']}
          </span>
          {this.renderChoices(obj, questionCount)}
          </div>
        )
      }
    ))
  }

  renderChoices(questionObj, questionCount) {
    return questionObj['choices'].split('|').map((choice, index) => (
      <div 
        className='option'
        key = {questionObj.id + index}
      >
        <input 
          type = 'radio'
          id = {questionObj.id + index}
          name = {questionCount}
          onChange = {this.setActiveQuestion}
        />
        <label htmlFor={questionObj.id + index}>
          {choice}
        </label>
      </div>
    ))
  }

  setActiveQuestion(event) {
    this.setState({
      activeQuestion: this.state.activeQuestion.add(parseInt(event.target.name)+1)
    });
  }

  render() {
    return (
      <div id='questions-container'>
        {this.renderQuestions(this.props.questionsObj)}
      </div>
    );
  }
}
