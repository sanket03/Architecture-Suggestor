import React from 'react';
import * as Scroll from 'react-scroll';
import QuestionComponent from './QuestionComponent';
import QuestionChoice from './QuestionChoice';
const Questions = (props) => {

  // Scroll to bottom of the page as soon as the component is rendered
  const scrollToBottom = (() => {
    props.loadCount > 1 && Scroll.animateScroll.scrollToBottom({containerId: 'questions-container'});
  })();

  // Render active questions
  const renderQuestions = ({ questionQueue, questionsObj, onOptionSelectHandler, questionResponseMap }) => {
    let questionCount = 0;
    return questionQueue.map(questionId => {
      let questionObj, group;
      for (let groupId in questionsObj) {
        if (questionId in questionsObj[groupId]) {
          questionObj = questionsObj[groupId][questionId];
          group = groupId;
          break;
        }
      }
      questionCount = questionCount + 1;
      let isAnswered = questionResponseMap.hasOwnProperty(questionId);
      let isMultiple = questionObj.multiple
      let selectedChoices = isAnswered ? questionResponseMap[questionId].response : new Set();
      return (
        <QuestionComponent
          key = {questionId}
          index = {questionId}
          questionObj = {questionObj}
          group = {group}
          questionCount = {questionCount}
          isMultiple = {isMultiple}
        >
          {renderChoices(questionId, questionObj, questionCount, selectedChoices, isMultiple, onOptionSelectHandler)}
        </QuestionComponent>
      )
    })
  }

  // Render respective choices for a
  const renderChoices = (questionId, questionObj, questionCount, selectedChoices, isMultiple, onOptionSelectHandler) => {
    return (
      questionObj['choices'].split('|')
                            .map((choice, index) => {
                              let isChecked = selectedChoices.has(choice);
                              return (
                                <QuestionChoice
                                  onOptionSelectHandler = {onOptionSelectHandler}
                                  questionId = {questionId}
                                  questionCount = {questionCount}
                                  index = {index}
                                  key = {index}
                                  isMultiple = {isMultiple}
                                  isChecked = {isChecked}
                                >
                                  {choice}
                                </QuestionChoice>
                              )
                            })
    )
  }

  return (
    <div 
      id='questions-container'
      ref = {props.questionContainerRef}
    >
      {renderQuestions(props)}
    </div>
  );
}

export default Questions;