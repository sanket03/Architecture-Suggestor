import React, { Component } from 'react';
import * as d3 from 'd3';
import SvgRectComponent from './SvgRectComponent';
import SvgTextComponent from './SvgTextComponent';
import SvgImageComponent from './SvgImageComponent';
import SvgPathComponent from './SvgPathComponent';
import icon from '../../images/azure.png';
import { link } from 'fs';

const Diagram = (props) => {

  const hasActiveEntities = (entities) => {
    for(let entityObj of entities) {
      if(entityObj.isActive) {
        return true;
      }
    }
    return false;
  }

  
  const addUnitsInPx = (value) => {
    return `${value}px`;
  }

  // Checks whether the group should be rendered or not
  const shouldRenderGroup = (groupQuestionsObj, questionResponseMap) => {
    let allQuestionsInactive = true;
    // Check if all the questions are inactive
    for(let questionObj of groupQuestionsObj) {
      if(questionObj.isActive) {
        allQuestionsInactive = false;
      }
    }

    // Check for question Ids in question Response map
    if(allQuestionsInactive) {
      return true;
    } else {
      for(let questionObj of groupQuestionsObj) {
        if(questionObj.id in questionResponseMap) {
          return true
        }
      }
    }
    return false;
  }

  // Draw link between groups
  const drawLink = (pathDAttr) => {
    return (
      <SvgPathComponent 
        d = {pathDAttr}
      />
    )
  }

  // Render links between groups
  const renderLinks = (groupId, dimensionsObj) => {
    let groupBoxDimensions = svgRectModule.getDimensions(groupId);
    let linkElements= [];
    if(groupBoxDimensions.hasOwnProperty('parentGroups')) {
      let parentGroups = groupBoxDimensions.parentGroups;
      parentGroups.forEach((parentGroupId, index) => {
        let parentGroupBoxDimensions = svgRectModule.getDimensions(parentGroupId);
        let pathCoordinates = svgPathModule.calcPath(groupBoxDimensions, parentGroupBoxDimensions);
        let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates);
        linkElements.push(drawLink(pathDAttr))
      }) 
    }
    return linkElements;
  }
  
  // Render entity image as svg component
  const renderEntityImage = (url, groupBoxWidth, yCoord) => {
    let imageAttr = svgImageModule.setImageAttributes(url.icon, groupBoxWidth, yCoord);
    return (
      <SvgImageComponent 
        x = {addUnitsInPx(imageAttr.x)}
        y = {addUnitsInPx(imageAttr.y)}
        height = {addUnitsInPx(imageAttr.height)}
        width = {addUnitsInPx(imageAttr.width)}
        translateX = {imageAttr.translateX}
        url = {imageAttr.url}
      />
    )
  }

  // Render entity text as svg component
  const renderEntityText = (entityName, groupBoxWidth, yCoord) => {
    let textAttr = svgTextModule.setTextAttributes(groupBoxWidth, yCoord)
    return (
      <SvgTextComponent
            x = {addUnitsInPx(textAttr.x)}
            y = {addUnitsInPx(textAttr.y)}
            height = {addUnitsInPx(textAttr.height)}
            text = {entityName}
      />
    )
  }

  // Render Entities for a group
  const renderEntities = (entitiesObj, groupBoxWidth, groupBoxHeight) => {
    let imageElement = '';
    let textElement = '';
    let entityElement = [];
    let imageHeight = svgImageModule.defaultImageHeight;
    let textHeight = svgTextModule.defaultTextHeight;
    let yCoord = svgRectModule.defaultGroupOffset; 
    for(let entityObj in entitiesObj) {
      if(entitiesObj[entityObj].isActive) {
        let imageUrl = entityObj.url;
        imageElement = renderEntityImage({icon},  groupBoxWidth, yCoord);
        entityElement.push(imageElement)
        yCoord += imageHeight;
        textElement = renderEntityText(entitiesObj[entityObj].name, groupBoxWidth, yCoord);
        yCoord += textHeight;
        yCoord += svgRectModule.defaultGroupOffset;
        entityElement.push(textElement);
      }
    }
    return entityElement;
  }

  // Render group box
  const renderGroupBox = (architectureDetails, questionDetails, questionResponseMap) => {
    let element = [];
    svgRectModule.initializeDimensionsObject();
    for(let groupId in architectureDetails) {
      let groupDataObj = architectureDetails[groupId];
      let rectAttr = svgRectModule.setRectAttributes(groupId, groupDataObj.entities);
      let showElements = shouldRenderGroup(questionDetails[groupId], questionResponseMap) && groupDataObj.isActive
      if(showElements){
        element.push(
          <>
            <svg  
              key = {groupId}
              className = {showElements ? 'show' : 'hide'}
              height = {addUnitsInPx(rectAttr.height)}
              width = {addUnitsInPx(rectAttr.width)}
              x = {addUnitsInPx(rectAttr.x)}
              y = {addUnitsInPx(rectAttr.y)}
            >      
              <SvgRectComponent
                height = '100%'
                width = '100%'
              >
              </SvgRectComponent>
              {renderEntities(groupDataObj.entities, rectAttr.width, rectAttr.height)}
            </svg>
            {renderLinks(groupId)}
          </>
        )
        let relatedGroups = groupDataObj.relatedGroups;
        let relatedGroupCounter = 0;
        for(let relatedGroupId in relatedGroups) {
          let groupEntities = architectureDetails[relatedGroupId].entities;
            svgRectModule.setCoordinatesForRelatedGroups(groupId, relatedGroupId, relatedGroupCounter, groupEntities);
            svgRectModule.pupulateParentGroupList(groupId, relatedGroupId);
            relatedGroupCounter +=1;
        }
      }

    }
    return element;
  }

    return (
      <div id = 'diagram-container'>
        <svg id = 'diagram-wrapper'>
          {props.loadCount > 1 && renderGroupBox(props.architectureDetails,props.questionDetails, props.questionResponseMap)}
        </svg>
      </div>
    );
}

export default Diagram;


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

const svgImageModule = (() => {
  const defaultImageHeight = 35;
  const defaultImageWidth = 35;
  let imagePrototype = {
    'x' : 0,
    'y' : 0,
    'height': defaultImageHeight,
    'width': defaultImageWidth,
    'translateX': (defaultImageWidth/2)*(-1),
    'url': '',
    calcImageXcoord(groupBoxWidth) {
      this.x = groupBoxWidth/2;
    },
    calcImageYcoord(yCoord) {
      this.y = yCoord;
    },
    setImageUrl(url) {
      this.url = url;
    }
  }

  const setImageAttributes = (url, groupBoxWidth, yCoord) => {
    let image = Object.create(imagePrototype);
    image.calcImageXcoord(groupBoxWidth);
    image.calcImageYcoord(yCoord);
    image.setImageUrl(url); 
    return image;
  }

  return {
    defaultImageWidth,
    defaultImageHeight,
    setImageAttributes
  }
})()

const svgTextModule = (() => {
  const defaultTextHeight = 20;
  let textPrototype = {
    'x' : 0,
    'y' : 0,
    'height': defaultTextHeight,
    calcTextXcoord(groupBoxWidth) {
      this.x = groupBoxWidth/2;
    },
    calcTextYcoord(yCoord) {
      this.y = yCoord;
    }
  }

  const setTextAttributes = (groupBoxWidth, yCoord) => {
    let text = Object.create(textPrototype);
    text.calcTextXcoord(groupBoxWidth);
    text.calcTextYcoord(yCoord);
    return text;
  }

  return {
    defaultTextHeight,
    setTextAttributes
  }
})()

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