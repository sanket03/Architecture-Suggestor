import React from 'react';
import '../../styles/SvgRectComponent.scss';

const SvgRectComponent = (props) =>  {
    let {
        height,
        width,
        addStroke
    } = props
    return (

        <rect               
            height = {height}
            width = {width}
            className = { addStroke ? 'rect-stroke' : ''}
        />
    );
}

export default SvgRectComponent;
