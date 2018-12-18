

import * as d3 from 'd3';
const svgRectModule = (() => {
    const defaultRectWidth = 150;
    const defaultRectHeight = 65;
    const defaultRectGap = 50;
    const defaultGroupOffset = 10;
    const strokeWidth = 2;
    let dimensions = {};
    let rectPrototype = {
      'height': 0,
      'width': 0,
      'x': 0,
      'y': 0,
      calcRectHeight(groupId, entitiesObj) {
        let activeEntityCount = 0;
        for(let entityObj in entitiesObj) {
          activeEntityCount = entitiesObj[entityObj].isActive ? activeEntityCount + 1 : activeEntityCount
        }
        this.height = defaultRectHeight*activeEntityCount + defaultGroupOffset;
        setHeight(groupId, this.height);
      }
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
    const setRectAttributes = (groupNode) => {
      let rect = Object.create(rectPrototype);
      let groupId = groupNode.data.id;
      let groupNodeDepth = groupNode.depth;
      rect.height = groupNode.xSize;
      rect.width = groupNode.ySize;
      rect.x = groupNode.y + defaultRectGap*groupNodeDepth;
      rect.y = groupNode.x - groupNode.xSize/2;
      createEntryInDimensionsObj(groupId);   
      setHeight(groupId, rect.height);
      setWidth(groupId, rect.width);
      setXCoordinate(groupId, rect.x);
      setYCoordinate(groupId, rect.y);
      setLeftEdgeMid(groupId);
      setRightEdgeMid(groupId);
      return rect;
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
      strokeWidth,
      setRectAttributes,
      defaultGroupOffset,
      defaultRectWidth,
      defaultRectGap,
      defaultRectHeight,
      initializeDimensionsObject,
      pupulateParentGroupList
    }
  
  })()

  export default svgRectModule;