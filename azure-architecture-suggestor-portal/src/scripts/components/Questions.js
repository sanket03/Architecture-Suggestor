import React from 'react';
import QuestionComponent from './QuestionComponent';
import QuestionChoice from './QuestionChoice';
const Questions = (props) => {

  // Render active questions
  const renderQuestions = ({questionsObj, onOptionSelectHandler, questionResponseMap}) => {
    let questionCount = 0;
    return Object.keys(questionsObj).map(group => 
      questionsObj[group].map((question, index) => {
        if(question.isActive) {
          questionCount = questionCount + 1;
          let isAnswered = questionResponseMap.hasOwnProperty(question.id)
          let selectedChoice = isAnswered ? questionResponseMap[question.id].response : '';
          return (
            <QuestionComponent 
              key = {index}
              question = {question} 
              index = {index} 
              group = {group}
              questionCount = {questionCount}
            >
              {renderChoices(question, questionCount, selectedChoice, onOptionSelectHandler)}
            </QuestionComponent>
          )
        } else {
          return (<></>);
        }
      }
    ))
  }

  // Render respective choices for a
  const renderChoices = (questionObj, questionCount, selectedChoice, onOptionSelectHandler) => {
    return questionObj['choices'].split('|').map((choice, index) => {
      let isChecked = selectedChoice === choice ? true : false; 
      return (
        <QuestionChoice 
          onOptionSelectHandler = {onOptionSelectHandler}
          questionObj = {questionObj}
          questionCount = {questionCount}
          index = {index}
          key = {index}
          isChecked = {isChecked}
        >
          {choice}
        </QuestionChoice>
    )})
  }

    return (
      <div id='questions-container'>
        {renderQuestions(props)}
      </div>
    );
}

export default Questions;