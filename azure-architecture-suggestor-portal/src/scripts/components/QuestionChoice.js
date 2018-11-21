import React from 'react';
const QuestionChoice = (props) => {
    let {
        onOptionSelectHandler,
        questionObj,
        questionCount,
        index
    } = props;

    return (
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
            {props.children}
        </label>
      </div>
    )
}

export default QuestionChoice;