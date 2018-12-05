

import * as d3 from 'd3';
const svgRectModule = (() => {
    const defaultRectWidth = 150;
    const defaultRectHeight = 65;
    const defaultGroupOffset = 10;
    let dimensions = {};
    let rectPrototype = {
      'height': 0,
      'width': defaultRectWidth,
      'x': 0,
      'y': 0,
      calcRectHeight(groupId, entitiesObj) {
        let activeEntityCount = 0;
        for(let entityObj in entitiesObj) {
          activeEntityCount = entitiesObj[entityObj].isActive ? activeEntityCount + 1 : activeEntityCount
        }
        this.height = defaultRectHeight*activeEntityCount + defaultGroupOffset;
        setHeight(groupId, this.height);
      },
      calcRectXcoord(groupId) {
        if(dimensions[groupId].hasOwnProperty('x')) {
            this.x =  dimensions[groupId].x;
        } else {
            setXCoordinate(groupId, 10);
            this.x = 10;
        }
      },
      calcRectYcoord(groupId) {
        if(dimensions[groupId].hasOwnProperty('y')) {
            this.y = dimensions[groupId].y;
        } else {
          let svgHeight = calcSvgHeight();
          let yCoord = (svgHeight - this.height)/2;
          setYCoordinate(groupId, yCoord);
          this.y = yCoord;
        }
      },
      calcRectWidth(groupId, rectWidth) {
        setWidth(groupId, rectWidth);
      }
    }
  
    const calcSvgHeight = () => {
        let svgHeight = d3.select('svg').node().getBoundingClientRect().height;
        return svgHeight;
    }
  
    // Create entry for a group in dimensions object
    const createEntryInDimensionsObj = (groupId) => {
      dimensions[groupId] = !dimensions.hasOwnProperty(groupId) ? {} : dimensions[groupId];
    }
  
    // Get X coordinate for a group box from dimensions object
    const getXCoordinate = (groupId) => {
      return dimensions[groupId].x;
    }
  
    // Get Y coordinate for a group box from dimensions object
    const getYCoordinate = (groupId) => {
      return dimensions[groupId].y;
    }
  
    // Get height for a group box from dimensions object
    const getHeight = (groupId) => {
      return dimensions[groupId].height;
    }
  
    // Get dimensions for a particular group
    const getDimensions = (groupId) => {
      return dimensions[groupId];
    }
  
    // Set X coordinate for a group box in dimensions object
    const setXCoordinate = (groupId, x) => {
      dimensions[groupId].x = x;
    }
  
    // Set Y coordinate for a group box in dimensions object
    const setYCoordinate = (groupId, y) => {
      dimensions[groupId].y = y;
    }
  
    // Set height for a group box in dimensions object
    const setHeight = (groupId, height) => {
      dimensions[groupId].height = height;
    }
  
    // Set width for a group box in dimensions object
    const setWidth = (groupId, rectWidth) => {
      dimensions[groupId].width = rectWidth;
    }
  
    // Set left edge midpoint for groupBox
    const setLeftEdgeMid = (groupId) => {
      let groupBoxDimensions = dimensions[groupId]
      let {x, y, height, width} = groupBoxDimensions;
      groupBoxDimensions.leftEdgeMid = {
        'x': x,
        'y': y + height/2
      };
    }
  
    // Set right edge midpoint for groupBox
    const setRightEdgeMid = (groupId) => {
      let groupBoxDimensions = dimensions[groupId]
      let {x, y, height, width} = groupBoxDimensions;
      groupBoxDimensions.rightEdgeMid = {
        'x': x + width,
        'y': y + height/2
      };
    }
  
    // Set top edge midpoint for groupBox
    const setTopEdgeMid = (groupId) => {
      let groupBoxDimensions = dimensions[groupId]
      let {x, y, height, width} = groupBoxDimensions;
      groupBoxDimensions.topEdgeMid = {
        'x': x + width/2,
        'y': y
      };
    }
  
    // Set bottom edge midpoint for groupBox
    const setBottomEdgeMid = (groupId) => {
      let groupBoxDimensions = dimensions[groupId]
      let {x, y, height, width} = groupBoxDimensions;
      groupBoxDimensions.bottomEdgeMid = {
        'x': x + width/2,
        'y': y + height 
      }
    }
  
    // Calculate x,y,height and width for group box and set them in dimensions object
    const setRectAttributes = (groupId, entitiesObj) => {
      createEntryInDimensionsObj(groupId);
      let rect = Object.create(rectPrototype);
      rect.calcRectHeight(groupId, entitiesObj);
      rect.calcRectXcoord(groupId);
      rect.calcRectYcoord(groupId);
      rect.calcRectWidth(groupId, defaultRectWidth);
      setLeftEdgeMid(groupId);
      setRightEdgeMid(groupId);
      setBottomEdgeMid(groupId);
      setTopEdgeMid(groupId);
      return rect;
    }
  
    // Calculate height for related group box
    const calcRelatedGroupHeight = (entitiesObj) => {
      let activeEntityCount = 0;
      for(let entityObj in entitiesObj) {
        activeEntityCount = entitiesObj[entityObj].isActive ? activeEntityCount + 1 : activeEntityCount
      }
      return defaultRectHeight*activeEntityCount + defaultGroupOffset;
    }
  
    // Calculate x coordinate for related groups
    const calcRectXcoordForRelatedGroups = (groupId, rectWidth, connectorLength, index) => {
      switch(index) {
        case 0:
          return getXCoordinate(groupId) + rectWidth + connectorLength;
        case 1:
          return getXCoordinate(groupId);
        case 2:
          return getXCoordinate(groupId);
      }
    }
  
    // Calculate y coordinate for related groups
    const calcRectYcoordForRelatedGroups = (groupId, relatedGroupheight, rectWidth, connectorLength, index) => {
      switch(index) {
        case 0:
          if(getHeight(groupId) > relatedGroupheight) {
            return getYCoordinate(groupId) + (Math.abs(getHeight(groupId) - relatedGroupheight))/2;
          } else {
            return getYCoordinate(groupId) - (Math.abs(getHeight(groupId) - relatedGroupheight))/2;
          }
        case 1:
          return getYCoordinate(groupId) - connectorLength - relatedGroupheight;
        case 2:
          return getYCoordinate(groupId) + getHeight(groupId) + connectorLength + relatedGroupheight;
      }
    }
  
    // Calculate x,y,height for related group box and set them in dimensions object
    const setCoordinatesForRelatedGroups = (groupId, relatedGroupId, index, entitiesObj) => {
      let x, y;
      let relatedGroupheight = calcRelatedGroupHeight(entitiesObj);
      createEntryInDimensionsObj(relatedGroupId);
      x = calcRectXcoordForRelatedGroups(groupId, defaultRectWidth, 50, index);
      y = calcRectYcoordForRelatedGroups(groupId, relatedGroupheight, defaultRectWidth, 50, index);
      setXCoordinate(relatedGroupId, x);
      setYCoordinate(relatedGroupId, y);
      setHeight(relatedGroupId, relatedGroupheight);
    }
  
    const initializeDimensionsObject = () => {
      dimensions = {}
    }
  
    // Populate parent group list for related groups
    const pupulateParentGroupList = (groupId, relatedGroupId) => {
      if(!dimensions[relatedGroupId].hasOwnProperty('parentGroups')) {
        dimensions[relatedGroupId].parentGroups = [];
      } 
      dimensions[relatedGroupId].parentGroups.push(groupId)
    }
  
    return {
      getDimensions,
      setRectAttributes,
      defaultGroupOffset,
      initializeDimensionsObject,
      setCoordinatesForRelatedGroups,
      pupulateParentGroupList
    }
  
  })()

  export default svgRectModule;