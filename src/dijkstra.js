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

	const path = calculatePath();
	const weight = costsTable[finishNode];

	return `Weight: ${weight}, Path: ${path}`;

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

// The example from above...
// Answer: Weight: 6, Path: start -> b -> a -> finish
console.log(dijkstra(exampleGraph, 'start', 'finish'));

// The following are exercises from section 7.1 of "Grokking Algorithms" (p. 139)

/* Exercise A: A more complex graph.
*
*        [A]>>>4>>>[C]
*       ^ ^ v       v v
*      5  ^  v      v  2
*     ^   ^   v     v   v
* [start] 8    2    6 [finish]
*     v   ^     v   v   ^
*      2  ^      v  v  1
*       v ^       v v ^
*        [B]>>>7>>>[D]
*
* Answer: Weight: 8, Path: start -> a -> d -> finish
*/

const exampleGraphA = {
	'start': {
		'a': 5,
		'b': 2,
	},
	'a': {
		'c': 4,
		'd': 2,
	},
	'b': {
		'a': 8,
		'd': 7,
	},
	'c': {
		'd': 6,
		'finish': 2,
	},
	'd': {
		'finish': 1,
	},
	'finish': {},
};

console.log(dijkstra(exampleGraphA, 'start', 'finish'));

/* Exercise B: A graph with a cycle.
*
* [start]>>>10>>>[A]>>20>>>[B]>>>30>>>[Finish]
*                  ^       v
*                   1     1 
*                    ^   v
*                     [C]
*
* Answer: Weight: 60, Path: start -> a -> b -> finish
*/

const exampleGraphB = {
	'start': {
		'a': 10,
	},
	'a': {
		'b': 20,
	},
	'b': {
		'c': 1,
		'finish': 30,
	},
	'c': {
		'a': 1,
	},
	'finish': {},
};

console.log(dijkstra(exampleGraphB, 'start', 'finish'));

/* Exercise C: A graph with negative weights.
*
*	[start]>>2>>[B]>>2>>[finish]
*     v       ^ v      ^
*      2     2   2    2
*       v   ^     v  ^
*        [A]<<-1<<[C]
*
* Answer: Trick question. 
*         Dijkstra's algorithm can't detect a shortest path with negative-weight cycles!
*         Use Bellman-Ford algorithm instead.
*/