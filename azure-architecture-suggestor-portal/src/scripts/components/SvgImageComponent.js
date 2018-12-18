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
    url = url ? url : 'Microsoft Azure.png';
    return (

        <image               
            height = {height}
            width = {width}
            x = {x}
            y = {y}
            transform = {`translate(${translateX}, ${0})`}
            xlinkHref = {require(`../../images/azure_icons_png/${url}`)}
        />
    );
}

export default SvgImageComponent;
