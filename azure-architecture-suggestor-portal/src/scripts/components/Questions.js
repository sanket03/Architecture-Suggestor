import React from 'react';

const Questions = (props) => {

  // Render active questions
  const renderQuestions = ({questionsObj, onOptionSelectHandler}) => {
    let questionCount = 0;
    return Object.keys(questionsObj).map(group => 
      questionsObj[group].map((question, index) => {
        if(question.isActive) {
          questionCount = questionCount + 1;
          return (
            <div 
              key = {index}
              className = 'question'
              data-id = {question['id']}
              data-group = {group}
            >
            <span>{questionCount}.</span>
            <span className = 'question-title'>
              {question['question']}
            </span>
            {renderChoices(question, questionCount,onOptionSelectHandler)}
            </div>
          )
        } else {
          return (<></>);
        }
      }
    ))
  }

  // Render respective choices for a
  const renderChoices = (questionObj, questionCount, onOptionSelectHandler) => {
    return questionObj['choices'].split('|').map((choice, index) => (
      <div 
        className = 'option'
        key = {questionObj.id + index}
      >
        <input 
          type = 'radio'
          id = {questionObj.id + index}
          name = {questionCount}
          onChange = {onOptionSelectHandler}
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

    return (
      <div id='questions-container'>
        {renderQuestions(props)}
      </div>
    );
}

export default Questions;