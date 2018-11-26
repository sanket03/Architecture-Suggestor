import React, { Component } from 'react';
import * as d3 from 'd3';
import SvgRectComponent from './svgRectComponent';

const Diagram = (props) => {

  let coordinates = {

  }


  const calcSvgHeight = () => {
      let svgHeight = d3.select('svg').node().getBoundingClientRect().height;
      return Math.floor(svgHeight/2);
  }

  const calcRectHeight = (entityCount) => {
    return 50*entityCount + 'px';
  } 

  const calcRectXcoord = (groupId) => {
    if(groupId in coordinates) {
        return coordinates[groupId].x;
    } else {
      return '15px';
    }
  }

  const calcRectYcoord = (groupId) => {
    if(groupId in coordinates) {
        return coordinates[groupId].y;
    } else {
      let height = calcSvgHeight();
      coordinates[groupId] = {};
      coordinates[groupId].y = height;
      return height + 'px';
    }
  }


  const initializeRectComponent = (groupId, entitiesObj) => {
    let width = '200px'
    let height = calcRectHeight(Object.keys(entitiesObj).length);
    let x = calcRectXcoord(groupId);
    let y = calcRectYcoord(groupId);
    return {
      width,
      height,
      x,
      y
    }
  }

  const hasActiveEntities = (entities) => {
    for(let entityObj of entities) {
      if(entityObj.isActive) {
        return true;
      }
    }
    return false;
  }

  const renderGroupBox = (architectureDetails) => {
    let element = [];
    for(let groupId in architectureDetails) {
      let groupDataObj = architectureDetails[groupId];
      if(groupDataObj.isActive) {
        let rectAttr = initializeRectComponent(groupId, groupDataObj.entities);
        element.push(      
          <SvgRectComponent
            key = {groupId}
            groupData = {architectureDetails[groupId]}
            show = {architectureDetails[groupId].isActive}
            height = {rectAttr.height}
            width = {rectAttr.width}
            x = {rectAttr.x}
            y = {rectAttr.y}
          />
        )
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