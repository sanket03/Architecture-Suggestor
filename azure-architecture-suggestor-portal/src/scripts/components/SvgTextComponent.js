import React from 'react';
import '../../styles/SvgTextComponent.scss';

const SvgTextComponent = (props) =>  {
    let {
        x,
        y,
        height,
        text
    } = props
    return (

        <text               
            x = {x}
            y = {y}       
            height = {height}
        >{text}</text>
    );
}

export default SvgTextComponent;
