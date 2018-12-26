const graphModule = (() => {
    let graphPrototype = {
        verticesCount: 0,
        adjList: new Map(),

        // Set vertices count for a graph 
        incrementVerticesCount() {
            this.verticesCount += 1;
        },

        // Add vertex to a graph
        addVertex(vertex) {
            this.adjList.set(vertex, new Set());
            this.incrementVerticesCount();
        },

        // Add edge to a graph
        addEdge(src, dest) {
            this.adjList.get(src).add(dest);
        },

        // Check if vertex is already present in any other adjancy list
        checkVertexInAdjList(src, dest) {
            let vertex = this.adjList.get(dest);
            let isPresentInAdjList = false;
            if(vertex) {
                isPresentInAdjList = vertex.has(src);
            }
            return isPresentInAdjList;
        }
    }

    // Perform depth first search for a graph
    const dfs = (graph, vertex, orderingIndex, visitedSet, topologicalOrder) => {
        visitedSet.add(vertex);
        let adjacentVertices = graph.adjList.get(vertex);
        for(let adjacentVertex of adjacentVertices) {
            if(!visitedSet.has(adjacentVertex)) {
                orderingIndex = dfs(graph, adjacentVertex, orderingIndex, visitedSet, topologicalOrder)
            }
        }
        topologicalOrder[orderingIndex] = vertex;
        return orderingIndex - 1;
    }

    // Creates topological ordering for the DAG
    const createTopologicalOrder = (graph) => {
        let verticesCount = graph.verticesCount;
        let visitedSet = new Set();
        let topologicalOrder = [];
        let orderingIndex = verticesCount-1;
        let vertexList = graph.adjList.keys();
        for(let vertex of vertexList) {
            if(!visitedSet.has(vertex)) {
                orderingIndex = dfs(graph, vertex, orderingIndex, visitedSet, topologicalOrder);
            }
        }
        return topologicalOrder;
    }

    // Creates graph with provided groups object
    const createGraph = (groupsObj) => {
        let graph = Object.create(graphPrototype);
        for(let groupId in groupsObj) {
            graph.addVertex(groupId);
            let relatedGroups = groupsObj[groupId].relatedGroups;
            for(let relatedGroupId in relatedGroups) {
                !(graph.checkVertexInAdjList(groupId, relatedGroupId)) && graph.addEdge(groupId, relatedGroupId);
            }
        }

        return graph;
    }

    return {
        createGraph,
        createTopologicalOrder
    }
})()

export default graphModule;