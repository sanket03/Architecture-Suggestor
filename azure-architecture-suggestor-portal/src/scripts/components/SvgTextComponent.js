import React from 'react';
import '../../styles/SvgTextComponent.scss';

const SvgTextComponent = (props) =>  {
    let {
        x,
        y,
        height,
        text,
        fontSize
    } = props
    return (

        <text
            x = {x}
            y = {y} 
            height = {height}
            fontSize = {fontSize}
        >
            {text}
        </text>
    );
}

export default SvgTextComponent;
