import React from 'react';
import Questions from './Questions';
import Diagram from './Diagram';

import '../../styles/Workspace.scss';

const Workspace = (props) => {
    return (
        <div id = 'workspace'>
            <Questions 
                questionsObj={props.questionsObj}/>
            <Diagram />
        </div>
    )
}
export default Workspace;
