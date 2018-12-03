import React from 'react';
import '../../styles/SvgRectComponent.scss';

const SvgRectComponent = (props) =>  {
    let {
        height,
        width,
    } = props
    return (

        <rect               
            height = {height}
            width = {width}           
        />
    );
}

export default SvgRectComponent;
