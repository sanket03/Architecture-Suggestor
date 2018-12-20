import React from 'react';
const QuestionComponent = (props) => {
    let {
        questionObj,
        index,
        group,
        questionCount,
        isMultiple
    } = props;

    return (
        <div 
        className = 'question'
        data-id = {index}
        data-group = {group}
        data-multiple = {isMultiple}
      >
        <span>{questionCount}.</span>
        <span className = 'question-title'>
            {questionObj['question']}
        </span>
        {props.children}
      </div>
    )
}

export default QuestionComponent;