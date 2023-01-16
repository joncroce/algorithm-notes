// Calculate the shortest path in a weighted graph.

/*
*        [A]
*       ^ ^ v
*      6  ^  1
*     ^   ^   v
* [start] 3 [finish]
*     v   ^   ^
*      2  ^  5
*       v ^ ^
*        [B]
*/

// A directed acyclic graph in the form of a hash table.
// Each key is a node, and its value is a hash table of its neighbor nodes and the edge weight to get to them.
const exampleGraph = {
	'start': {
		'a': 6,
		'b': 2,
	},
	'a': {
		'finish': 1,
	},
	'b': {
		'a': 3,
		'finish': 5,
	},
	'finish': {},
};

// A hash table describing the cost to reach each node from the starting node.
// This is updated as nodes are processed.
// As-yet-unreachable nodes are said to have Infinite cost.
const exampleCostsTable = {
	'a': 6,
	'b': 2,
	'finish': Infinity,
};

// A hash table describing the parent node with the lowest known cost of travel.
const exampleParentsTable = {
	'a': 'start',
	'b': 'start',
	'finish': undefined,
};

// Also need an array to hold a record of the nodes already processed.
const exampleProcessedNodes = [];


//Implementation
function dijkstra(graph, startNode, finishNode) {
	const costsTable = buildCostsTable();
	const parentsTable = buildParentsTable();
	const processedNodes = [];
	
	let node = findLowestCostNode(costsTable, processedNodes);

	while (node) {
		let cost = costsTable[node];
		let neighbors = graph[node];

		Object.keys(neighbors).forEach((neighborNode) => {
			let newCost = cost + neighbors[neighborNode];

			if (costsTable[neighborNode] > newCost) {
				costsTable[neighborNode] = newCost;
				parentsTable[neighborNode] = node;
			}
		})

		processedNodes.push(node);
		node = findLowestCostNode();
	}

	return calculatePath();

	function buildCostsTable() {
		return Object.keys(graph).reduce((costs, currentNode) => {
			if (currentNode !== startNode) {
				costs[currentNode] = graph[startNode][currentNode] ?? Infinity;
			}
			return costs;
		}, {});
	}

	function buildParentsTable() {
		return Object.keys(graph).reduce((parents, currentNode) => {
			if (currentNode !== startNode) {
				parents[currentNode] = graph[startNode][currentNode] ? startNode : undefined;
			}
			return parents;
		}, {});
	}

	function findLowestCostNode() {
		let lowestCost = Infinity;
		let lowestCodeNode;
		
		Object.keys(costsTable).forEach((node) => {
			const cost = costsTable[node];
			if (cost < lowestCost && !processedNodes.includes(node)) {
				lowestCost = cost;
				lowestCodeNode = node;
			}
		});
	
		return lowestCodeNode;
	}

	function calculatePath() {
		let result = `${finishNode}`;
		let previousNode = finishNode;
		let currentNode;

		while (currentNode !== startNode) {
			currentNode = parentsTable[previousNode];
			result = `${currentNode} -> ${result}`;
			previousNode = currentNode;
		}
	
		return result;
	}
}

// Test
console.log(dijkstra(exampleGraph, 'start', 'finish'));
