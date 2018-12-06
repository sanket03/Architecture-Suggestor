import React, { Component } from 'react';

import SvgRectComponent from './SvgRectComponent';
import SvgTextComponent from './SvgTextComponent';
import SvgImageComponent from './SvgImageComponent';
import SvgPathComponent from './SvgPathComponent';

import svgRectModule from '../utilities/svgRectModule';
import svgImageModule from '../utilities/svgImageModule';
import svgTextModule from '../utilities/svgTextModule';
import svgPathModule from '../utilities/svgPathModule';
import { node } from 'prop-types';

const Diagram = (props) => {

  let treeBreadthList = {}; 

  let {
    architectureDetails,
    questionDetails,
    questionResponseMap,
    rootNode
  } = props;


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
  
  const calcTreeBreadth = (parentGroupId, relatedGroupsObj) => {
    let treeLevelBreadth = 0;
    let nodeCount = 0;
    for(let groupId in relatedGroupsObj) {
      if(shouldRenderGroup(questionDetails[groupId], questionResponseMap) & architectureDetails[groupId].isActive) {
        let groupHeight = svgRectModule.calcRelatedGroupHeight(architectureDetails[groupId].entities)
        let relatedGroups = architectureDetails[groupId].relatedGroups;
        treeLevelBreadth = treeLevelBreadth + (calcTreeBreadth(groupId, relatedGroups) > 0 & groupHeight > 10 ? calcTreeBreadth(groupId, relatedGroups)  : groupHeight);
        nodeCount = nodeCount + 1;
      }
    }
 
    if(nodeCount > 0) {    
      treeLevelBreadth = treeLevelBreadth + (nodeCount-1)*50;
    }
    treeBreadthList[parentGroupId] = treeLevelBreadth;
    return treeLevelBreadth;
  }

  treeBreadthList[rootNode] = calcTreeBreadth(rootNode, architectureDetails[rootNode].relatedGroups);

  console.log(treeBreadthList);

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
    let imageAttr = svgImageModule.setImageAttributes(url, groupBoxWidth, yCoord);
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
        let imageUrl = entitiesObj[entityObj].url;
        imageElement = renderEntityImage(imageUrl,  groupBoxWidth, yCoord);
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
          {props.loadCount > 1 && renderGroupBox(architectureDetails, questionDetails, questionResponseMap)}
        </svg>
      </div>
    );
}

export default Diagram;