import * as d3 from 'd3';
const svgPathModule = (() => {
  
    // Calculate path for drawing lines
    const calcPath = (groupBoxDimensions, parentGroupBoxDimensions) => {
      let pathCoordinates = [];
      if(groupBoxDimensions.leftEdgeMid.y === parentGroupBoxDimensions.rightEdgeMid.y) {
        pathCoordinates.push(parentGroupBoxDimensions.rightEdgeMid, groupBoxDimensions.leftEdgeMid)
      } 
      else if(groupBoxDimensions.y > parentGroupBoxDimensions.y) {
        pathCoordinates.push(parentGroupBoxDimensions.bottomEdgeMid, groupBoxDimensions.topEdgeMid)
      }
      else if(groupBoxDimensions.y <  parentGroupBoxDimensions.y) {
        pathCoordinates.push(parentGroupBoxDimensions.topEdgeMid, groupBoxDimensions.bottomEdgeMid)
      }
      console.log(pathCoordinates);
      return pathCoordinates;
    }
  
    const getPathDAttr = (pathCoordinates) => {
      let lineAccessor =  d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveLinear);
      return lineAccessor(pathCoordinates);
    }
  
    return {
      calcPath,
      getPathDAttr
    }
  })()

  export default svgPathModule;