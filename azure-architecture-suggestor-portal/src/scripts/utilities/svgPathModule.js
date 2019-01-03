import * as d3 from 'd3';
import commonModule from '../utilities/commonModule';

const svgPathModule = (() => {
  
    const arrowMarkerPercentage = 30/100;

    // Truncate to two decimal places
    const truncateToTwoDecimal = (pathCoordinates) => {
      let updatedPathCoords = pathCoordinates.map(coordObj => {
                                coordObj.x = commonModule.truncateToTwoDecimal(coordObj.x);
                                coordObj.y = commonModule.truncateToTwoDecimal(coordObj.y);
                                return coordObj;
                              });
      return updatedPathCoords;
    }

    // Calculate path for drawing lines for connected groups
    const calcPathForConnectedGroups = (groupBoxDimensions, relatedGroupBoxDimensions) => {
      let pathCoordinates = [];
      pathCoordinates.push(groupBoxDimensions.rightEdgeMid, relatedGroupBoxDimensions.leftEdgeMid);
      pathCoordinates = truncateToTwoDecimal(pathCoordinates);
      return pathCoordinates;
    }

    // Calculate path for drawing lines between top-top related groups
    const calcPathForTopmostRelatedGroups = (maxYCoordAmongLevels, groupBoxDimensions, relatedGroupBoxDimensions, rectGap) => {
      let pathCoordinates = [];
      pathCoordinates.push(
        {
          x: groupBoxDimensions.x + groupBoxDimensions.width/2,
          y: groupBoxDimensions.y
        },
        {
          x: groupBoxDimensions.x + groupBoxDimensions.width/2,
          y: maxYCoordAmongLevels - rectGap/2
        },
        {
          x: relatedGroupBoxDimensions.x + relatedGroupBoxDimensions.width/2,
          y: maxYCoordAmongLevels - rectGap/2
        },
        {
          x: relatedGroupBoxDimensions.x + relatedGroupBoxDimensions.width/2,
          y: relatedGroupBoxDimensions.y
        }
      )

      pathCoordinates = truncateToTwoDecimal(pathCoordinates);
      return pathCoordinates;
    }

    // Calculate path for drawing lines between bottom-bottom related groups
    const calcPathForBottommostRelatedGroups = (minYCoordAmongLevels, groupBoxDimensions, relatedGroupBoxDimensions, rectGap) => {
      let pathCoordinates = [];
      pathCoordinates.push(
        {
          x: groupBoxDimensions.x + groupBoxDimensions.width/2,
          y: groupBoxDimensions.y + groupBoxDimensions.height
        },
        {
          x: groupBoxDimensions.x + groupBoxDimensions.width/2,
          y: minYCoordAmongLevels + rectGap/2
        },
        {
          x: relatedGroupBoxDimensions.x + relatedGroupBoxDimensions.width/2,
          y: minYCoordAmongLevels + rectGap/2
        },
        {
          x: relatedGroupBoxDimensions.x + relatedGroupBoxDimensions.width/2,
          y: relatedGroupBoxDimensions.y + relatedGroupBoxDimensions.height
        }
      )
      pathCoordinates = truncateToTwoDecimal(pathCoordinates);
      return pathCoordinates;
    }
  
    // Get 'd' attribute for svg path
    const getPathDAttr = (pathCoordinates, curveType) => {
      let lineAccessor =  d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3[curveType]);
      return lineAccessor(pathCoordinates);
    }
  
    return {
      calcPathForConnectedGroups,
      calcPathForTopmostRelatedGroups,
      calcPathForBottommostRelatedGroups,
      getPathDAttr,
      arrowMarkerPercentage
    }
  })()

  export default svgPathModule;