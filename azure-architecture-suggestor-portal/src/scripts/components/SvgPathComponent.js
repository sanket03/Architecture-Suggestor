import React from 'react';
import '../../styles/SvgPathComponent.scss';

const SvgPathComponent = (props) =>  {
    let {
        d
    } = props
    return (

        <path               
            d = {d}
        />
    );
}

export default SvgPathComponent;
