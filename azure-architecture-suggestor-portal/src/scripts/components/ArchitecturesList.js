import React from 'react';

import '../../styles/ArchitecturesList.scss';

const ArchitecturesList = (props) => {
  let {
    onchangeHandler,
    architecturesList,
    selectRef
  } = props;

  // Render architectures list
  const renderArchitecturesList = (architecturesList) => {
    return Object.keys(architecturesList).map(item =>
      <option 
        value = {item} 
        key = {item}>{architecturesList[item]}
      </option>
    )
  }

  return (
      <div id = 'architectures-select-box'>
        <label htmlFor = 'architecture-solutions'>Solutions</label> <br/>
          <select 
            id = 'architecture-solutions'
            onChange = {onchangeHandler}
            ref = {selectRef}
          >
            {renderArchitecturesList(architecturesList)}
          </select>
      </div>
  );
}

export default ArchitecturesList;
