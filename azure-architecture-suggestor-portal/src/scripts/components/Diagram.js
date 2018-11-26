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

  const renderGroupBox = (architectureDetails) => {
    let element = [];
    for(let groupId in architectureDetails) {
      let groupDataObj = architectureDetails[groupId];
      if(groupDataObj.isActive) {
        let rectAttr = svgModule.setRectAttributes(groupId, groupDataObj.entities);
        element.push(      
          <SvgRectComponent
            key = {groupId}
            groupData = {architectureDetails[groupId]}
            show = {architectureDetails[groupId].isActive}
            height = {addUnitsInPx(rectAttr.height)}
            width = {addUnitsInPx(rectAttr.width)}
            x = {addUnitsInPx(rectAttr.x)}
            y = {addUnitsInPx(rectAttr.y)}
          />
        )
        let relatedGroups = groupDataObj.relatedGroups;
        // relatedGroups.foreach((relatedGroupId, index) => {
        //   svgModule.setCoordinatesForRelatedGroups(groupId, relatedGroupId, index);
        // })
      }
    }
    return element;
  }

    return (
      <div id = 'diagram-container'>
        <svg id = 'diagram-wrapper'>
          {props.loadCount > 1 && renderGroupBox(props.architectureDetails)}
        </svg>
      </div>
    );
}

export default Diagram;


const svgModule = (() => {

  let dimensions = {

  }

  let rectPrototype = {
    'height': 0,
    'width': 100,
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

  const setXCoordinate = (groupId, x) => {
    dimensions[groupId].x = x;
  }

  const setYCoordinate = (groupId, y) => {
    dimensions[groupId].y = y;
  }

  const setHeight = (groupId, height) => {
    dimensions[groupId].height = height;
  }

  const setRectAttributes = (groupId, entitiesObj) => {
    createEntryInCoordinatesObj(groupId);
    let rect = Object.create(rectPrototype);
    rect.calcRectHeight(groupId, Object.keys(entitiesObj).length);
    rect.calcRectXcoord(groupId);
    rect.calcRectYcoord(groupId);
    console.log('dimensions', dimensions[groupId])
    return rect;
  }

  const setCoordinatesForRelatedGroups = (groupId, relatedGroupId, index) => {
    // switch(index) {
    //   case 0:
    //     let x = 50 + getXCoordinate(groupId);
    //     let y = 
    // }
  }

  return {
    setRectAttributes
  }

})()