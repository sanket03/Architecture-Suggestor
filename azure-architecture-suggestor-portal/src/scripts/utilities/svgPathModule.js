import * as d3 from 'd3';
import svgRectModule from './svgRectModule';
const svgPathModule = (() => {
  
    const arrowMarkerPercentage = 30/100;

    // Calculate path for drawing lines
    const calcPath = (groupBoxDimensions, relatedGroupBoxDimensions) => {
      let pathCoordinates = [];
      pathCoordinates.push(groupBoxDimensions.rightEdgeMid, relatedGroupBoxDimensions.leftEdgeMid);
      return pathCoordinates;
    }
  
    // Get 'd' attribute for svg path
    const getPathDAttr = (pathCoordinates) => {
      let lineAccessor =  d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveStep);
      return lineAccessor(pathCoordinates);
    }
  
    return {
      calcPath,
      getPathDAttr,
      arrowMarkerPercentage
    }
  })()

  export default svgPathModule;