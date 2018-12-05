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
    url = url ? url : 'azure.png';
    return (

        <image               
            height = {height}
            width = {width}
            x = {x}
            y = {y}
            transform = {`translate(${translateX}, ${0})`}
            xlinkHref = {require(`../../images/${url}`)}
        />
    );
}

export default SvgImageComponent;
