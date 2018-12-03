import React, { Component } from 'react';
import * as d3 from 'd3';
import SvgRectComponent from './svgRectComponent';

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

  const renderGroupBox = (architectureDetails, questionDetails, questionResponseMap) => {
    let element = [];
    for(let groupId in architectureDetails) {
      let groupDataObj = architectureDetails[groupId];
      let rectAttr = svgModule.setRectAttributes(groupId, groupDataObj.entities);
      element.push(      
        <SvgRectComponent
          key = {groupId}
          groupData = {architectureDetails[groupId]}
          show = {shouldRenderGroup(questionDetails[groupId], questionResponseMap) && groupDataObj.isActive}
          height = {addUnitsInPx(rectAttr.height)}
          width = {addUnitsInPx(rectAttr.width)}
          x = {addUnitsInPx(rectAttr.x)}
          y = {addUnitsInPx(rectAttr.y)}
        />
      )
      let relatedGroups = groupDataObj.relatedGroups;
      let relatedGroupCounter = 0;
      for(let relatedGroupId in relatedGroups) {
        let groupEntities = architectureDetails[relatedGroupId].entities;
          svgModule.setCoordinatesForRelatedGroups(groupId, relatedGroupId, relatedGroupCounter, groupEntities);
          relatedGroupCounter +=1;
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


const svgModule = (() => {
  const rectWidth = 100;
  let dimensions = {

  }

  let rectPrototype = {
    'height': 0,
    'width': rectWidth,
    'x': 0,
    'y': 0,
    calcRectHeight(groupId, entityCount) {
      this.height =  50*entityCount;
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
    calcRectWidth(groupId) {
      setWidth(groupId, rectWidth);
    }
  }

  const calcSvgHeight = () => {
      let svgHeight = d3.select('svg').node().getBoundingClientRect().height;
      return svgHeight;
  }

  const createEntryInCoordinatesObj = (groupId) => {
    dimensions[groupId] = !dimensions.hasOwnProperty(groupId) ? {} : dimensions[groupId];
  }

  const getXCoordinate = (groupId) => {
    return dimensions[groupId].x;
  }

  const getYCoordinate = (groupId) => {
    return dimensions[groupId].y;
  }

  const getHeight = (groupId) => {
    return dimensions[groupId].height;
  }

  const setXCoordinate = (groupId, x) => {
    dimensions[groupId].x = x;
  }

  const setYCoordinate = (groupId, y) => {
    dimensions[groupId].y = y;
  }

  const setHeight = (groupId, height) => {
    dimensions[groupId].height = height;
  }

  const setWidth = (groupId, rectWidth) => {
    dimensions[groupId].width = rectWidth;
  }

  const calcRelatedGroupHeight = (entityCount) => {
    return 50*entityCount;
  }

  const setRectAttributes = (groupId, entitiesObj) => {
    createEntryInCoordinatesObj(groupId);
    let rect = Object.create(rectPrototype);
    rect.calcRectHeight(groupId, Object.keys(entitiesObj).length);
    rect.calcRectXcoord(groupId);
    rect.calcRectYcoord(groupId);
    rect.calcRectWidth(groupId)
    console.log('dimensions', dimensions[groupId])
    return rect;
  }

  const setCoordinatesForRelatedGroups = (groupId, relatedGroupId, index, entitiesObj) => {
    createEntryInCoordinatesObj(relatedGroupId)
    switch(index) {
      case 0:
        let relatedGroupheight = calcRelatedGroupHeight(Object.keys(entitiesObj).length);
        let x = getXCoordinate(groupId) + rectWidth + 50;
        let y = (getHeight(groupId) - relatedGroupheight)/2;
        setXCoordinate(relatedGroupId, x);
        setYCoordinate(relatedGroupId, y);
        setHeight(relatedGroupId, relatedGroupheight);
    }
  }

  return {
    setRectAttributes,
    setCoordinatesForRelatedGroups
  }

})()