import React from 'react';
const QuestionChoice = (props) => {
    let {
        onOptionSelectHandler,
        questionId,
        questionCount,
        index,
        isChecked
    } = props;

    let questionOptionKey = `${questionId}${index+1}`
    return (
        <div 
        className = 'option'
        key = {questionOptionKey}
      >
        <input 
          type = 'radio'
          id = {questionOptionKey}
          name = {questionCount}
          onChange = {onOptionSelectHandler}
          checked = {isChecked}
        />
        <label 
          htmlFor={questionOptionKey}
          className='pointer'
        >
            {props.children}
        </label>
      </div>
    )
}

export default QuestionChoice;