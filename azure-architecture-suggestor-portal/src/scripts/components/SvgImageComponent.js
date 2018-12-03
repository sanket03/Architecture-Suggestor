import React from 'react';

const SvgImageComponent = (props) =>  {
    let {
        x,
        y,
        height,
        width,
        translateX,
        url
    } = props
    return (

        <image               
            height = {height}
            width = {width}
            x = {x}
            y = {y}
            transform = {`translate(${translateX}, ${0})`}
            xlinkHref = {url}
        />
    );
}

export default SvgImageComponent;
