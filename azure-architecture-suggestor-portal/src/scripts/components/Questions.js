import React from 'react';
import QuestionComponent from './QuestionComponent';
import QuestionChoice from './QuestionChoice';
const Questions = (props) => {

  // Render active questions
  const renderQuestions = ({questionsObj, onOptionSelectHandler}) => {
    let questionCount = 0;
    return Object.keys(questionsObj).map(group => 
      questionsObj[group].map((question, index) => {
        if(question.isActive) {
          questionCount = questionCount + 1;
          return (
            <QuestionComponent 
              key = {index}
              question = {question} 
              index = {index} 
              group = {group}
              questionCount = {questionCount}
            >
              {renderChoices(question, questionCount,onOptionSelectHandler)}
            </QuestionComponent>

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
      <QuestionChoice 
        onOptionSelectHandler = {onOptionSelectHandler}
        questionObj = {questionObj}
        questionCount = {questionCount}
        index = {index}
        key = {index}
      >
        {choice}
      </QuestionChoice>
    ))
  }

    return (
      <div id='questions-container'>
        {renderQuestions(props)}
      </div>
    );
}

export default Questions;