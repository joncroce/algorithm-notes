// Implementation based on Aditya Bhargava's "Grokking Algorithms" book.

// Time complexity of Quicksort:
// 	O(n^2) in the worst case (elements already sorted in either direction, or elements all the same)
// 	O(log n) in the best case
// 	O(n log n) in the average case

// The average case can be achieved by choosing a random pivot.

// Implementation where the pivot is always the first element in the array
function quickSort(arr) {
	// base case
	if (arr.length < 2) {
		return arr;
	}

	// partition
	const pivot = arr[0];
	const lesser = [];
	const greater = [];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] <= pivot) {
			lesser.push(arr[i])
		} else {
			greater.push(arr[i])
		}
	}

	// recursion
	return [...quickSort(lesser), pivot, ...quickSort(greater)];
}

// test 
const unsorted = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

console.log(`Unsorted Array: ${unsorted}`);

const sorted = quickSort(unsorted);

console.log(`Sorted Array: ${sorted}`);