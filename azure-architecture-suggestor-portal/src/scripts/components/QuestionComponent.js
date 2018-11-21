import React from 'react';
const QuestionComponent = (props) => {
    let {
        index,
        question,
        group,
        questionCount
    } = props;

    return (
        <div 
        className = 'question'
        data-id = {question['id']}
        data-group = {group}
      >
        <span>{questionCount}.</span>
        <span className = 'question-title'>
            {question['question']}
        </span>
        {props.children}
      </div>
    )
}

export default QuestionComponent;