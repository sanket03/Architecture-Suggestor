import React from 'react';
import ArrowMarker from './ArrowMarker'
import SvgPathComponent from './SvgPathComponent';

const SvgMarkerComponent = () => {
    return (
        <defs>
            <ArrowMarker>
                <SvgPathComponent d = {'M2,2 L10,6 L2,10 L6,6 L2,2'}/>
            </ArrowMarker>
        </defs>
    )
}

export default SvgMarkerComponent;