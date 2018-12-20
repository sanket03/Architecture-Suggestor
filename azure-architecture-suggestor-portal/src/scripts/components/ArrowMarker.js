import React from 'react';

const ArrowMarker = (props) => {
    let {
        arrowMarkerDimension
    } = props;

    return (
        <marker
            id = "arrow-marker"
            markerUnits = "userSpaceOnUse"
            markerWidth = {arrowMarkerDimension}
            markerHeight = {arrowMarkerDimension}
            viewBox = "0 0 12 12"
            refX = "12"
            refY = "6"
            orient = "auto">
        >
            {props.children}
        </marker>
    )
}

export default ArrowMarker;