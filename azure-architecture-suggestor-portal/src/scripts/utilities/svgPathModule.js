import * as d3 from 'd3';
import svgRectModule from './svgRectModule';
const svgPathModule = (() => {
  
    // Calculate path for drawing lines
    const calcPath = (groupBoxDimensions, relatedGroupBoxDimensions) => {
      let pathCoordinates = [];
      pathCoordinates.push(groupBoxDimensions.rightEdgeMid, relatedGroupBoxDimensions.leftEdgeMid);
      return pathCoordinates;
    }
  
    const getPathDAttr = (pathCoordinates) => {
      let lineAccessor =  d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveStep);
      return lineAccessor(pathCoordinates);
    }
  
    return {
      calcPath,
      getPathDAttr
    }
  })()

  export default svgPathModule;