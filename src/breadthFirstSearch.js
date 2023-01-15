// TODO: Refactor so the path itself is recorded, and the depth calculated from that.

function bfs(hashTable, start, checkFn) {
	if (checkFn(start)) {
		return { result: start, depth: 0 };
	}

	const queue = [...hashTable[start]];
	const checked = new Set()
	let depth = 1;
	const countAtDepth = [0, queue.length]

	let found = false;
	
	while (!found && queue.length) {
		let current = queue.pop();

		if (countAtDepth[depth] === 0) {
			depth++;
		} 
		countAtDepth[depth]--;

		if (!checked.has(current)) {
			if (checkFn(current)) {
				return { result: current, depth }
			} else {
				checked.add(current);
				let itemsToAdd = hashTable[current] ?? [];
				queue.unshift(...itemsToAdd);

				let numberOfItemsToAdd = itemsToAdd.length;
				if (!countAtDepth[depth + 1]) {
					countAtDepth[depth + 1] = numberOfItemsToAdd;
				} else {
					countAtDepth[depth + 1] += numberOfItemsToAdd;
				}
			}	
		}
	}

	return { result: null, depth: null }		
}

// Test

// TODO: Improve mock data (try some unidirectional graph)

// absurd table of edible things
const testHashTable = {
	'apple': ['pie', 'snack', 'juice'],
	'orange': ['juice', 'snack', 'salad'],
	'juice': ['grape', 'apple', 'orange'],
	'grape': ['juice', 'wine'],
	'snack': ['chips', 'apple', 'orange'],
	'potato': ['chips', 'salad'],
	'wine': ['grape', 'barley'],
	'barley': ['wine', 'grain'],
	'grain': ['wheat', 'oat', 'barley'],
	'oat': ['grain'],
	'chips': ['paint', 'potato'],
	'pie': ['apple'],
	'salad': ['orange', 'barley', 'potato'],
}

console.log(bfs(testHashTable, 'apple', (item) => item === 'paint')) // should be 3 (apple -> snack -> chips -> paint)
console.log(bfs(testHashTable, 'juice', (item) => item === 'wine')) // should be 2 (juice -> grape -> wine)
console.log(bfs(testHashTable, 'chips', (item) => item === 'potato')) // should be 1 (chips -> potato)