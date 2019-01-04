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
import graphModule from '../utilities/graphModule';
import commonModule from '../utilities/commonModule';

const Diagram = (props) => {
    let diagramSize;
    let treeDataObj;
    let treeLevelsDimensions = new Map();

    let {
        architectureDetails,
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

    // Calculate svg diagram size
    const calcDiagramSize = () => {
        let diagramSelector = document.getElementById('diagram-wrapper');
        let diagramHeight = commonModule.truncateToTwoDecimal(calcElementHeight(diagramSelector));
        let diagramWidth  = commonModule.truncateToTwoDecimal(calcElementWidth(diagramSelector));
        return [diagramWidth, diagramHeight]
    }

    // Create object for d3 tree
    const prepareDataForTreeLayout = (node, architectureDetails, parentChildrenArray) => {
        let groupData = architectureDetails[node];
        let treeHeight = 0;
        let childNodesHeight = [0];
        let nodeObj = {
            id: node,
            entities: groupData.entities,
            size: [],
            children: []
        };
        let connectedGroups = groupData.longestPathGroups;
        if(groupData.isActive) {
            parentChildrenArray && parentChildrenArray.push(nodeObj);
            if(connectedGroups) {
                for(let relatedGroupId of connectedGroups) {
                    childNodesHeight.push(prepareDataForTreeLayout(relatedGroupId, architectureDetails, nodeObj.children).treeHeight);
                }
            }
        }
        treeHeight = Math.max(...childNodesHeight) + treeHeight + 1;
        return {nodeObj, treeHeight};
    }

    // Check if group is topmost group on its level
    const ifGroupTopmost = (groupId, groupBoxDimensions, groupDepth, treeLevelsDimensions) => {
        let groupTopYCoord = groupBoxDimensions.y;
        if(treeLevelsDimensions.get(groupDepth).high ===  groupTopYCoord) {
            return true
        } else {
            return false;
        }
    }

    // Check if group is bottommost group on its level
    const ifGroupBottommost = (groupId, groupBoxDimensions, groupDepth, treeLevelsDimensions) => {
        let groupBottomYCoord = groupBoxDimensions.y + groupBoxDimensions.height;
        if(treeLevelsDimensions.get(groupDepth).low ===  groupBottomYCoord) {
            return true
        } else {
            return false;
        }
    }

    // Calculate max height among levels for given pair of levels
    const calcMaxYCoordAmongLevels = (groupDepth, relatedGroupDepth, treeLevelsDimensions) => {
        let maxYCoord = treeLevelsDimensions.get(groupDepth).high;
        let currentDepth = groupDepth + 1;
        while(currentDepth <= relatedGroupDepth) {
            maxYCoord = maxYCoord < treeLevelsDimensions.get(currentDepth).high ? maxYCoord : treeLevelsDimensions.get(currentDepth).high;
            currentDepth += 1;
        }
        return maxYCoord;
    }

    // Calculate min height among levels for given pair of levels
    const calcMinYCoordAmongLevels = (groupDepth, relatedGroupDepth, treeLevelsDimensions) => {
        let minYCoord = treeLevelsDimensions.get(groupDepth).low;
        let currentDepth = groupDepth + 1;
        while(currentDepth <= relatedGroupDepth) {
            minYCoord = minYCoord > treeLevelsDimensions.get(currentDepth).low ? minYCoord : treeLevelsDimensions.get(currentDepth).low;
            currentDepth += 1;
        }
        return minYCoord; 
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
    const renderLinks = (tree, architectureDetails, treeLevelsDimensions, rectGap) => {
        let linkElements= [];
        tree.descendants().forEach((node) => {
            let groupId = node.data.id;
            let connectedGroups = node.data.children;
            let groupObject = architectureDetails[groupId]
            let relatedGroupsObj = groupObject.relatedGroups;
            let groupBoxDimensions = svgRectModule.getDimensions(groupId);
            let traversedRelatedNodes = new Set();

            // Create path for all the child nodes
            // There can be cases when all the related groups are not child nodes
            // Therefore loop through all the related groups as well
            // If they were not part of children array, then create path for them
            connectedGroups.forEach((connectedGroup) => {
                let connectedGroupId = connectedGroup.id;
                let connectedGroupBoxDimensions = svgRectModule.getDimensions(connectedGroupId);
                let pathCoordinates = svgPathModule.calcPathForConnectedGroups(groupBoxDimensions, connectedGroupBoxDimensions);
                let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates, 'curveStep');
                linkElements.push(drawLink(pathDAttr));
                traversedRelatedNodes.add(connectedGroupId);
            });

            // Logic creating custom path
            // 1. Logic for connecting top-top nodes
            // 2. Logic for connecting bottom-bottom nodes
            // 3. Logic for all other cases
            for(let relatedGroupId in relatedGroupsObj) {
                if(architectureDetails[relatedGroupId].isActive && relatedGroupsObj[relatedGroupId].shouldConn && !traversedRelatedNodes.has(relatedGroupId)) {
                    let pathCoordinates;
                    let groupDepth = groupObject.depth;
                    let relatedGroupDepth = architectureDetails[relatedGroupId].depth;
                    let relatedGroupBoxDimensions = svgRectModule.getDimensions(relatedGroupId);
                    
                    // Connect top-top nodes
                    if(ifGroupTopmost(groupId, groupBoxDimensions, groupDepth, treeLevelsDimensions) && ifGroupTopmost(relatedGroupId, relatedGroupBoxDimensions, relatedGroupDepth, treeLevelsDimensions)){
                        let maxYCoordAmongLevels = calcMaxYCoordAmongLevels(groupDepth, relatedGroupDepth, treeLevelsDimensions);
                        pathCoordinates = svgPathModule.calcPathForTopmostRelatedGroups(maxYCoordAmongLevels, groupBoxDimensions, relatedGroupBoxDimensions, rectGap);

                    // Connect bottom-bottom nodes
                    } else if(ifGroupBottommost(groupId, groupBoxDimensions, groupDepth, treeLevelsDimensions) && ifGroupBottommost(relatedGroupId, relatedGroupBoxDimensions, relatedGroupDepth, treeLevelsDimensions)) {
                        let minYCoordAmongLevels = calcMinYCoordAmongLevels(groupDepth, relatedGroupDepth, treeLevelsDimensions);
                        pathCoordinates = svgPathModule.calcPathForBottommostRelatedGroups(minYCoordAmongLevels, groupBoxDimensions, relatedGroupBoxDimensions, rectGap);
                    } 
                    else {
                        pathCoordinates = svgPathModule.calcPathForCustomRelatedGroups(groupBoxDimensions, relatedGroupBoxDimensions, rectGap);
                    }

                    let pathDAttr = svgPathModule.getPathDAttr(pathCoordinates, 'curveLinear');
                    linkElements.push(drawLink(pathDAttr));
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
        let yCoord = commonModule.truncateToTwoDecimal(svgRectModule.defaultGroupOffsetPercentage*groupBoxWidth);
        for(let entityObj in entitiesObj) {
            if(entitiesObj[entityObj].isActive) {
                let imageUrl = entitiesObj[entityObj].url;
                imageElement = renderEntityImage(imageUrl,  groupBoxWidth, yCoord);
                entityElement.push(imageElement)
                yCoord += imageHeight;
                textElement = renderEntityText(entitiesObj[entityObj].name, groupBoxWidth, yCoord);
                yCoord += textHeight;
                yCoord += commonModule.truncateToTwoDecimal(svgRectModule.defaultGroupOffsetPercentage*groupBoxWidth);
                entityElement.push(textElement);
            }
        }
        return entityElement;
    }
    
    // Render svg rectangles for groups
    const renderGroups = (tree, architectureDetails, diagramWidth) => {
        let groupsElement = [];
        tree.descendants().forEach((node) => {
            let rectInstance = svgRectModule.setRectAttributes(node, diagramWidth);
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
        return commonModule.truncateToTwoDecimal(calcActiveEntityCount(entitiesObj) * nodeWidth * svgRectModule.defaultRectHeightPercentage);
    }

    // Calculate node width based on diagram size
    const calcNodeWidth = (treeDataObj, diagramWidth, rectGap) => {
        let nodeWidth;
        let treeHeight = treeDataObj.treeHeight;
        let rectGapOffset = treeHeight*rectGap;
    
        if((treeHeight*svgRectModule.defaultRectWidth + rectGapOffset) < diagramWidth) {
            nodeWidth = svgRectModule.defaultRectWidth;
        } else {
            nodeWidth = (diagramWidth - rectGapOffset)/treeHeight
        }
        return commonModule.truncateToTwoDecimal(nodeWidth);
    }

    // Perform BFS and calculate max and min points on y-axis for each level in the tree
    const calculateTreeLevelsDimensions = (tree, architectureDetails) => {
     // D3's node.each does a BFS
     tree.each((node) => {
        let nodeDepth = node.depth;
        let nodeId = node.data.id;
        let levelDim = treeLevelsDimensions.get(nodeDepth);
        let nodeDim = svgRectModule.getDimensions(nodeId);
        let topYRectAttr = nodeDim.y;
        let bottomYRectAttr = topYRectAttr + nodeDim.height;
        architectureDetails[nodeId].depth = nodeDepth;
        if(!treeLevelsDimensions.has(nodeDepth)) {
            treeLevelsDimensions.set(nodeDepth, { high: topYRectAttr, low: bottomYRectAttr })
        } else {
            if(topYRectAttr < levelDim.high) {
                levelDim.high = topYRectAttr;
            } else if(bottomYRectAttr > levelDim.low) {
                levelDim.low = bottomYRectAttr;
            }
            treeLevelsDimensions.set(nodeDepth, { high: levelDim.high, low: levelDim.low })
        }
     })
    }

    // Render architecture diagram
    const renderDiagram = (treeDataObj, architectureDetails) => {
        let diagramWidth = diagramSize[0];
        let rectGap = svgRectModule.calcRectGap(diagramWidth);
        let nodeWidth = calcNodeWidth(treeDataObj, diagramWidth, rectGap);

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
        let groupsElement = renderGroups(tree, architectureDetails, diagramWidth);
        calculateTreeLevelsDimensions(tree, architectureDetails);
        let linksElement = renderLinks(tree, architectureDetails, treeLevelsDimensions, rectGap);

        return (
            <g  transform = {`translate(10 ${diagramSize[1]/2})`}>
                {linksElement}
                {groupsElement}
                <SvgMarkerComponent arrowMarkerDimension = {rectGap*svgPathModule.arrowMarkerPercentage}/>
            </g>
        )
    }

    const initializeComponent = (() => {
        diagramSize = loadCount > 1 ? calcDiagramSize() : [];
        architectureDetails = graphModule.modifyArchDetailsObjForLongestPath(architectureDetails)
        treeDataObj = prepareDataForTreeLayout(rootNode, architectureDetails, null);
    })()
    

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