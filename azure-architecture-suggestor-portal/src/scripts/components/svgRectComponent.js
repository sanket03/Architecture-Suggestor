import React from 'react';
import '../../styles/SvgRectComponent.scss';

const SvgRectComponent = (props) =>  {
    let {
        height,
        width,
        addStroke,
        x,
        y
    } = props
    return (

        <rect               
            height = {height}
            width = {width}
            x = {x}
            y = {y}
            className = { addStroke ? 'rect-stroke' : ''}
        />
    );
}

export default SvgRectComponent;
