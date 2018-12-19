import React, { Component } from 'react';
import {flextree} from 'd3-flextree';

import SvgMarkerComponent from './SvgMarkerComponent';
import SvgRectComponent from './SvgRectComponent';
import SvgTextComponent from './SvgTextComponent';
import SvgImageComponent from './SvgImageComponent';
import SvgPathComponent from './SvgPathComponent';

import svgRectModule from '../utilities/svgRectModule';
import svgImageModule from '../utilities/svgImageModule';
import svgTextModule from '../utilities/svgTextModule';
import svgPathModule from '../utilities/svgPathModule';

const Diagram = (props) => {

    let {
        architectureDetails,
        questionDetails,
        questionResponseMap,
        rootNode,
        loadCount
    } = props;

    // Calculate height for a html element
    const calcElementHeight = (selector) => {
        return selector.getBoundingClientRect().height;
    }

    // Calculate width for a html element
    const calcElementWidth = (selector) => {
        return selector.getBoundingClientRect().width;
    }

    // Truncate values to decimal places
    const truncateToTwoDecimal = (value) => {
        return parseInt(value*100)/100;
    }

    // Calculate svg diagram size
    const calcDiagramSize = () => {
        let diagramSelector = document.getElementById('diagram-wrapper');
        let diagramHeight = truncateToTwoDecimal(calcElementHeight(diagramSelector));
        let diagramWidth  = truncateToTwoDecimal(calcElementWidth(diagramSelector));
        return [diagramWidth, diagramHeight]
    }

    let diagramSize = loadCount > 1 ? calcDiagramSize() : [];

    // Returns active entity count for a group
    const calcActiveEntityCount = (entitiesObj) => {
        let count = 0;
        for(let entity in entitiesObj) {
            count += (entitiesObj[entity].isActive ? 1: 0); 
        }
        return count;
    }

    // Calculate group height depending on the count of active entities
    const calcNodeHeight = (entitiesObj, nodeWidth) => {
        return calcActiveEntityCount(entitiesObj) * nodeWidth * svgRectModule.defaultRectHeightPercentage;
    }

    // Checks whether the group should be rendered or not
    const shouldRenderGroup = (architectureGroupObj, groupQuestionsObj, questionResponseMap) => {
        // Check if group is active
        let isActiveGroup = architectureGroupObj.isActive;

        // Check if all the entities are inactive
        let hasActiveEntities = false;
        let entitiesObj = architectureGroupObj.entities;
        for(let entityId in entitiesObj) {
            if(entitiesObj[entityId].isActive) {
                hasActiveEntities = true;
                break;
            }
        }
    
        if(hasActiveEntities && isActiveGroup) {
            // Check if all the questions are inactive
            let allQuestionsInactive = true;
            for(let questionId in groupQuestionsObj) {
                if(groupQuestionsObj[questionId].isActive) {
                allQuestionsInactive = false;
                }
            }
            // Check for question Ids in question Response map
            if(allQuestionsInactive) {
                return true;
            } else {
                for(let questionId in groupQuestionsObj) {
                    if(questionId in questionResponseMap) {
                        return true
                    }
                }
            }
            return false;
        } else {
            return false;
        }
    }


    // Create object for d3 tree
    const prepareDataForTreeLayout = (node, parentChildrenArray) => {
        let groupData = architectureDetails[node];
        let nodeHeight = 0;
        let childNodesHeight = [0];
        let nodeObj = {
            id: node,
            entities: groupData.entities,
            size: [],
            children: []
        };

        if(shouldRenderGroup(architectureDetails[node], questionDetails[node], questionResponseMap)) {
            //nodeObj.size.push(calcNodeHeight(groupData.entities), 150);
            parentChildrenArray && parentChildrenArray.push(nodeObj);
            for(let relatedGroupId in groupData.relatedGroups) {
                childNodesHeight.push(prepareDataForTreeLayout(relatedGroupId, nodeObj.children).nodeHeight);
            }
        } else {
            for(let relatedGroupId in groupData.relatedGroups) {
                childNodesHeight.push(prepareDataForTreeLayout(relatedGroupId, parentChildrenArray).nodeHeight);
            }
            nodeHeight = -1;
        }

        nodeHeight = Math.max(...childNodesHeight) + nodeHeight + 1;
        return {nodeObj, nodeHeight};
    }

    const treeDataObj = prepareDataForTreeLayout(rootNode, null);

    // Draw link between groups
    const drawLink = (pathDAttr) => {
        return (
        <SvgPathComponent 
            d = {pathDAttr}
        />
        )
    }

    // Render links between groups
    const renderLinks = (tree, architectureDetails, questionDetails, questionResponseMap) => {
        let linkElements= [];
        tree.descendants().forEach((node) => {
            let groupId = node.data.id;
            let childNodes = node.data.children;
            let groupObject = architectureDetails[groupId]
            let relatedGroupsObj = groupObject.relatedGroups;
            let groupBoxDimensions = svgRectModule.getDimensions(groupId);
            let traversedRelatedNodes = new Set();

            // Create path for all the child nodes
            // There can be cases when all the related groups are not child nodes
            // Therefore loop through all the related groups as well
            // If they were not part of children array, then create path for them
            childNodes.forEach((childNode) => {
                let childNodeId = childNode.id;
                let childNodeBoxDimensions = svgRectModule.getDimensions(childNodeId);
                let pathCoordinates = svgPathModule.calcPath(groupBoxDimensions, childNodeBoxDimensions);
                let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates);
                linkElements.push(drawLink(pathDAttr))
                traversedRelatedNodes.add(childNodeId);
            });

            // To do: Write logic creating custom path
            for(let relatedGroupId in relatedGroupsObj) {
                if(!traversedRelatedNodes.has(relatedGroupId)) {
                    let relatedGroupBoxDimensions = svgRectModule.getDimensions(relatedGroupId);
                    let showLink = shouldRenderGroup(architectureDetails[relatedGroupId], questionDetails[relatedGroupId], questionResponseMap);
                    if(showLink) {
                        let pathCoordinates = svgPathModule.calcPath(groupBoxDimensions, relatedGroupBoxDimensions);
                        let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates);
                        linkElements.push(drawLink(pathDAttr))
                    }
                    traversedRelatedNodes.add(relatedGroupId);
                }
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
                fontSize = {textAttr.fontSize}
                text = {entityName}             
        />
        )
    }

    // Render Entities for a group
    const renderEntities = (entitiesObj, groupBoxWidth, groupBoxHeight) => {
        let imageElement = '';
        let textElement = '';
        let entityElement = [];
        let imageHeight = svgImageModule.calcImageHeight(groupBoxWidth);
        let textHeight = svgTextModule.calcTextHeight(groupBoxWidth);
        let yCoord = truncateToTwoDecimal(svgRectModule.defaultGroupOffsetPercentage*groupBoxWidth);
        for(let entityObj in entitiesObj) {
            if(entitiesObj[entityObj].isActive) {
                let imageUrl = entitiesObj[entityObj].url;
                imageElement = renderEntityImage(imageUrl,  groupBoxWidth, yCoord);
                entityElement.push(imageElement)
                yCoord += imageHeight;
                textElement = renderEntityText(entitiesObj[entityObj].name, groupBoxWidth, yCoord);
                yCoord += textHeight;
                yCoord += truncateToTwoDecimal(svgRectModule.defaultGroupOffsetPercentage*groupBoxWidth);
                entityElement.push(textElement);
            }
        }
        return entityElement;
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
                    viewBox = {`0 0 ${rectInstance.width} ${rectInstance.height}`}
                    x = {rectInstance.x} 
                    y = {rectInstance.y}
                    height = {rectInstance.height} 
                    width = {rectInstance.width}
                >
                    <SvgRectComponent 
                        height = {rectInstance.height} 
                        width = {rectInstance.width}
                        addStroke = {calcActiveEntityCount(entitiesObj) > 1}
                    />
                    {renderEntities(entitiesObj, rectInstance.width, rectInstance.height)}
                </svg>
            )
        });
        return groupsElement;
    }

    // Render architecture diagram
    const renderDiagram = (treeDataObj, architectureDetails) => {

        let treeHeight = treeDataObj.nodeHeight;
        let diagramWidth = diagramSize[0];
        let rectGapOffset = treeHeight*svgRectModule.defaultRectGap;
        let nodeWidth;
        
        if((treeHeight*svgRectModule.defaultRectWidth + rectGapOffset) < diagramWidth) {
            nodeWidth = svgRectModule.defaultRectWidth;
        } else {
            nodeWidth = (diagramWidth - rectGapOffset)/treeHeight
        }
        console.log(nodeWidth)

        // Initialize tree layout with calculated size
        let layout = flextree(
            {
                nodeSize: node => [calcNodeHeight(node.data.entities, nodeWidth), nodeWidth],
                spacing: 50
            }
        );

        // Assign data to hierarchy
        let tree = layout.hierarchy(treeDataObj.nodeObj);

        // Map nodedata to tree layout
        layout(tree);

        // // Get rendering elements for groups
        let groupsElement = renderGroups(tree, architectureDetails, questionDetails, questionResponseMap);
        let linksElement = renderLinks(tree, architectureDetails, questionDetails, questionResponseMap);

        return (
            <g  transform = {`translate(10 ${diagramSize[1]/2})`}>
                {groupsElement}
                {linksElement}
                <SvgMarkerComponent />
            </g>
        )
    }
    
    return (
      <div id = 'architecture-container'>
        <div id = 'diagram-container'>
            <div id = 'diagram-header'>
                <h3>Architecture Diagram</h3>
            </div>
            <svg 
                id = 'diagram-wrapper'
                viewBox = {loadCount > 1 ? `0 0 ${diagramSize[0]} ${diagramSize[1]}` : ''}
            >
                {loadCount > 1 && renderDiagram(treeDataObj, architectureDetails)}
            </svg>
        </div>
      </div>
    );
}

export default Diagram;