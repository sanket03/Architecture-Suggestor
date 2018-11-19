import React, { Component } from 'react';

export default class Questions extends Component {

  constructor(props) {
    super(props);
  }

  renderQuestions({questionsObj, activeQuestion}) {
    let questionCount = 0;
    return Object.keys(questionsObj).map(level => 
      questionsObj[level].map((obj, index) => {
        questionCount = questionCount + 1;
        return (
          <div 
            key = {index}
            className = { activeQuestion.has(questionCount) ? 'question' : 'disable question'}
            data-id = {obj['id']}
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
          onChange = {this.props.onOptionSelectHandler}
        />
        <label 
          htmlFor={questionObj.id + index}
          className='pointer'
        >
          {choice}
        </label>
      </div>
    ))
  }

  render() {
    return (
      <div id='questions-container'>
        {this.renderQuestions(this.props)}
      </div>
    );
  }
}
