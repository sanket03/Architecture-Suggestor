import React from 'react';
import  * as svgToPng from 'save-svg-as-png';
import exportPng from '../../images/export_image.svg';

import '../../styles/ExportDiagram.scss';

const ExportDiagram = () => {

    // Create blob for png type
    const dataURItoBlob = (uri) => {
        var byteChars = atob(uri.split(',')[1]);
        var byteNumbers = [];
        for(var i = 0; i < byteChars.length; i++) {
            byteNumbers.push(byteChars.charCodeAt(i));
        }
        return new Blob([new Uint8Array(byteNumbers)], {type: 'image/png'});
    }

    // Logic for downloading image on edge
    const downloadFileOnEdge = (uri) => {
        let blob = dataURItoBlob(uri);
        window.navigator.msSaveOrOpenBlob(blob, "test.png");
    }

    // Logic for downloading image on chrome
    const downloadFileOnChrome = (uri) => {
        let link = document.createElement("a");
        link.setAttribute("href", uri);
        link.setAttribute("download", 'test');
        link.click();
    }


    const exportToPng = () => {
        svgToPng.svgAsPngUri(document.getElementById("diagram-wrapper"), {})
            .then((uri) => {
                if(window.navigator.msSaveOrOpenBlob) {
                    downloadFileOnEdge(uri)
                } 
                else {
                    downloadFileOnChrome(uri)
                }
            }).catch((ex)=> {
                console.log(ex);
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