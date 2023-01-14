// Implementation based on Aditya Bhargava's "Grokking Algorithms" book.

function findSmallest(arr) {
	let minValue = arr[0],
    	minValueIndex = 0;
	for (let i = 1; i < arr.length; i++) {
    	if (arr[i] < minValue) {
        	minValue = arr[i];
            minValueIndex = i;
        }
    }
    return minValueIndex;
}

function selectionSort(arr) {
	const newArr = [];
    while (arr.length) {
    	let minValueIndex = findSmallest(arr);
        newArr.push(arr[minValueIndex]);
        arr = arr.slice(0, minValueIndex).concat(arr.slice(minValueIndex + 1));
    }
    return newArr;
}

const unsorted = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

console.log(`Unsorted Array: ${unsorted}`);

const sorted = selectionSort(unsorted);

console.log(`Sorted Array: ${sorted}`);