import React from 'react';
import '../../styles/SvgPathComponent.scss';

const SvgPathComponent = (props) =>  {
    let {
        d,
        show
    } = props
    return (

        <path               
            d = {d}
            className = {show ? 'show' : 'hide'}
        />
    );
}

export default SvgPathComponent;
