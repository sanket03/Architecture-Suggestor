import React from 'react';

const SvgRectComponent = (props) =>  {
    let {
        height,
        width,
        x,
        y
    } = props
    return (
        <rect
            x = {x}
            y = {y}
            height = {height}
            width = {width}
        />
    );
}

export default SvgRectComponent;
