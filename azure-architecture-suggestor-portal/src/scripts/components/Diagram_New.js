import React, { Component } from 'react';
import {flextree} from 'd3-flextree';

import SvgRectComponent from './SvgRectComponent';
import SvgTextComponent from './SvgTextComponent';
import SvgImageComponent from './SvgImageComponent';
import SvgPathComponent from './SvgPathComponent';
import ExportDiagram from '../components/ExportDiagram';

import svgRectModule from '../utilities/svgRectModule';
import svgImageModule from '../utilities/svgImageModule';
import svgTextModule from '../utilities/svgTextModule';
import svgPathModule from '../utilities/svgPathModule';

const Diagram = (props) => {

    let {
        architectureDetails,
        questionDetails,
        questionResponseMap,
        rootNode
    } = props;
    

    // Returns active entity count for a group
    const calcActiveEntityCount = (entitiesObj) => {
        let count = 0;
        for(let entity in entitiesObj) {
            count += (entitiesObj[entity].isActive ? 1: 0); 
        }
        return count;
    }

    // Calculate group height depending on the count of active entities
    const calcNodeHeight = (entitiesObj) => {
        return calcActiveEntityCount(entitiesObj) * 65;
    }

    // Create object for d3 tree
    const prepareDataForTreeLayout = (node) => {
        let groupData = architectureDetails[node];
        let nodeObj = {
            id: node, 
            size: []
        }
        let childernArray = [];
       nodeObj.size.push(calcNodeHeight(groupData.entities), 150);
        for(let relatedGroupId in groupData.relatedGroups) {
            childernArray.push(prepareDataForTreeLayout(relatedGroupId));
        }
        nodeObj.children = childernArray;      
        return nodeObj;
    }

    const treeDataObj = prepareDataForTreeLayout(rootNode);

    // Truncate values to decimal places
    const truncateToTwoDecimal = (value) => {
        return parseInt(value*100)/100;
    }

    // Calculate height for a html element
    const calcElementHeight = (selector) => {
        return selector.getBoundingClientRect().height;
    }

    // Calculate width for a html element
    const calcElementWidth = (selector) => {
        return selector.getBoundingClientRect().width;
    }

    // Calculate svg diagram size
    const calcDiagramSize = () => {
        let diagramSelector = document.getElementById('diagram-wrapper');
        let diagramHeight = truncateToTwoDecimal(calcElementHeight(diagramSelector));
        let diagramWidth  = truncateToTwoDecimal(calcElementWidth(diagramSelector));
        return [diagramWidth, diagramHeight]
    }

    // Draw link between groups
    const drawLink = (pathDAttr, show) => {
        return (
        <SvgPathComponent 
            d = {pathDAttr}
            show = {show}
        />
        )
    }

    // Render links between groups
    const renderLinks = (tree, architectureDetails, questionDetails, questionResponseMap) => {
        let linkElements= [];
        tree.descendants().forEach((node) => {
            let groupId = node.data.id;
            let groupObject = architectureDetails[groupId]
            let relatedGroupsObj = groupObject.relatedGroups;
            let groupBoxDimensions = svgRectModule.getDimensions(groupId);    
            for(let relatedGroupId in relatedGroupsObj) {
                let relatedGroupBoxDimensions = svgRectModule.getDimensions(relatedGroupId);
                let show = shouldRenderGroup(questionDetails[relatedGroupId], questionResponseMap) && architectureDetails[relatedGroupId].isActive;
                let pathCoordinates = svgPathModule.calcPath(groupBoxDimensions, relatedGroupBoxDimensions);
                let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates);
                linkElements.push(drawLink(pathDAttr, show))
            }
        });
        return linkElements;
    }
    
    // Render entity image as svg component
    const renderEntityImage = (url, groupBoxWidth, yCoord) => {
        let imageAttr = svgImageModule.setImageAttributes(url, groupBoxWidth, yCoord);
        return (
        <SvgImageComponent 
            x = {imageAttr.x}
            y = {imageAttr.y}
            height = {imageAttr.height}
            width = {imageAttr.width}
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
                x = {textAttr.x}
                y = {textAttr.y}
                height = {textAttr.height}
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
    
    // Render svg rectangles for groups
    const renderGroups = (tree, architectureDetails, questionDetails, questionResponseMap) => {
        let groupsElement = [];
        tree.descendants().forEach((node) => {
            let rectInstance = svgRectModule.setRectAttributes(node);
            let groupId = node.data.id;
            let groupObject = architectureDetails[groupId]
            let entitiesObj = groupObject.entities;
            groupsElement.push(
                <svg 
                    x = {rectInstance.x} 
                    y = {rectInstance.y}
                    className = {shouldRenderGroup(questionDetails[groupId], questionResponseMap) && groupObject.isActive ? 'show' : 'hide'}
                >
                    <SvgRectComponent 
                        height = {rectInstance.height} 
                        width = {rectInstance.width} 
                    />
                    {renderEntities(entitiesObj, rectInstance.width, rectInstance.height)}
                </svg>
            )
        });
        return groupsElement;
    }

    // Render architecture diagram
    const renderDiagram = (treeDataObj, architectureDetails) => {

        let diagramSize = calcDiagramSize();

        // Initialixe tree layout with calculated size
        let layout = flextree({spacing: 50});

        // Assign data to hierarchy
        let tree = layout.hierarchy(treeDataObj);

        // Map nodedata to tree layout
        layout(tree);

        // // Get rendering elements for groups
        let groupsElement = renderGroups(tree, architectureDetails, questionDetails, questionResponseMap);
        let linksElement = renderLinks(tree, architectureDetails, questionDetails, questionResponseMap);

        return (
            <g  transform = {`translate(10 ${diagramSize[1]/2})`}>
                {groupsElement}
                {linksElement}
            </g>
        )
    }
    
    return (
      <div id = 'architecture-container'>
        <div id = 'diagram-container'>
            <div id = 'diagram-header'>              
                <ExportDiagram />
            </div>
            <svg id = 'diagram-wrapper'>
                {props.loadCount > 1 && renderDiagram(treeDataObj, architectureDetails)}
            </svg>
        </div>
      </div>
    );
}

export default Diagram;