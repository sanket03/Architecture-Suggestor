import React from 'react';
import  * as svgToPng from 'save-svg-as-png';
import exportPng from '../../images/export_image.svg';

import '../../styles/ExportDiagram.scss';

const ExportDiagram = () => {

    const exportToPng = () => {
        svgToPng.svgAsPngUri(document.getElementById("diagram-wrapper"), {})
            .then((uri) => {
            let link = document.createElement("a");
            link.setAttribute("href", uri);
            link.setAttribute("download", 'test');
            link.click();
        });
    }
    return (
        <button
            id = 'export-btn'
            onClick = {exportToPng}
        >
            <img src = {exportPng} />
        </button>
    )
}

export default ExportDiagram;