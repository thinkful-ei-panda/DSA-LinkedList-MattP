const LinkedList = require('./linked-list');
const CyleList = require('./cycle-list');
const DoubleLinkedList = require('./double-linked-list');
const main = () => {
	const SSL = new LinkedList();
	SSL.insertFirst(`Apollo`);
	SSL.insertLast(`Boomer`);
	SSL.insertLast(`Helo`);
	SSL.insertLast(`Husker`);
	SSL.insertLast(`Starbuck`);
	SSL.insertLast(`Tauhida`);
	// SSL.remove(`squirrel`);
	SSL.insertBefore(`Athena`, `Boomer`);
	SSL.insertAfter(`Hotdog `, `Helo`);
	SSL.insertAt(`Kat`, 3);
	SSL.remove(`Tauhida`);
	return SSL;
};
const cycle = () => {
	const CYCLE = new CyleList();
	CYCLE.insertFirst(`First`);
	CYCLE.insertAt(`Second`, 2);
	CYCLE.insertAt(`Third`, 3);
	CYCLE.insertAt(`Fourth`, 4);
	CYCLE.insertBefore(`Fifth`, `Second`);

	return CYCLE;
};
const display = (list) => {
	console.log(JSON.stringify(list));
};
/**
 * Length of SSL
 * @param {object} head - head of LinkedList SSL
 * @param {number} count
 */
const size = ({ head }, count = 0) => {
	while (head !== null) {
		count++;
		head = head.next;
	}
	return count;
};
const isEmpty = ({ head }) => {
	head === null
		? console.log(`Empty`)
		: console.log(`Not Empty, there are: ${size(main())} nodes`);
};
const findPrevious = ({ head }, node) => {
	!head && -1;

	head.value === node && console.log(`No previous node`);

	let prevNode = head;

	while (head !== null && head.next !== null) {
		if (head.value !== node) {
			prevNode = head;
			head = head.next;
		} else {
			return prevNode.value;
		}
	}
	console.log(`No previous node`);
};
console.log(' ');
console.log(`Display SSL Linked List`);
console.log(' ');
display(main());
console.log(' ');
console.log(`Length of SSL Linked List`);
console.log(' ');
console.log(size(main()));
console.log(' ');
isEmpty(main);
console.log(' ');
console.log(`Find Previous Node`);
console.log(' ');
console.log(findPrevious(main(), `Boomer`));
console.log(' ');
/**
 * 4. Mystery program
Analyze the following function (without running it in an IDE) to determine what problem it is trying to solve. What is the time complexity of this algorithm?

It appears this program is merging nodes if it finds duplicates 

function WhatDoesThisProgramDo(lst) {
// head is current node
  let current = lst.head;
  // if current is not null, not at end of list
    while (current !== null) {
      // make a copy of the current node
        let newNode = current;
        while (newNode.next !== null) {
          // if the next node is the same as current node, make it point to the next, next node
            if (newNode.next.value === current.value) {
                newNode.next = newNode.next.next;
            }
            else {
              // move up one node to find a match with newNode
                newNode = newNode.next;
            }
        }
        // move up from node and search again
        current = current.next;
    }
}
 */

/**
 * Reverse List
 * Write an algorithm to reverse a linked list. The time complexity of your algorithm should be linear (O(n)). For this exercise, notice we are not asking you just to print the linked list in reverse or use another linked list to store the value in reverse order. Your program should reverse the direction of a given singly linked list. In other words, all pointers should point backward. BONUS: Solve this problem using both recursive and iterative algorithms.
 *
 * {"head":{"value":"Apollo","next":{"value":"Athena","next":{"value":"Kat","next":{"value":"Boomer","next":{"value":"Helo","next":{"value":"Hotdog ","next":{"value":"Husker","next":{"value":"Starbuck","next":null}}}}}}}}}
 * {"head":{"value":"Starbuck", "next": {"value": "Husker", "next":{...}}}}
 */
const revLL = ({ head }) => {
	let node = head,
		previous,
		temp;

	while (node) {
		// save current next node in temp
		temp = node.next;
		// reverse pointer
		node.next = previous;
		// step forward
		previous = node;
		node = temp;
	}
	return previous;
};
const revLLRecursive = (head) => {
	if (!head || !head.next) {
		return head;
	}

	let temp = revLLRecursive(head.next);
	head.next.next = head;
	head.next = null;
	return temp;
};
console.log(' ');
console.log(`Reverse LinkedList`);
console.log(' ');
display(revLL(main()));
console.log(' ');
const { head } = main();
display(revLLRecursive(head));
console.log(' ');

/**
 * 6. 3rd from the end
Write an algorithm to find the 3rd element from the end of a linked list.
 */
const thirdFromEnd = ({ head }) => {
	let temp = head;
	let node = head;
	// count the length of the linked list
	let count = 1;
	while (temp !== null && temp.next !== null) {
		count++;
		temp = temp.next;
	}
	// start at the beginning and go until size of the list minus 3
	// this will give the 3rd position from the end

	for (let i = 0; i < count - 3; i++) {
		if (node === null) {
			return null;
		}
		// shift forward until nth time
		node = node.next;
	}

	return { ...node };
};
console.log(' ');
console.log(`Display 3rd from the end`);
console.log(' ');
console.log(thirdFromEnd(main()));
console.log(' ');
/**
 * 7. Middle of a list
Write an algorithm to find the middle element of a linked list. 
 */
const middleNode = ({ head }) => {
	let temp = head;
	let node = head;
	// count the length of the linked list
	let count = 0;
	while (temp !== null && temp.next !== null) {
		count++;
		temp = temp.next;
	}
	// find the middle, round down
	let middle = Math.floor(count / 2);

	// start at the beginning and go until the middle
	for (let i = 0; i < middle; i++) {
		if (node === null) {
			return null;
		}
		// shift forward until nth time
		node = node.next;
	}
	return { ...node };
};
console.log(' ');
console.log(`Find the middle Node`);
console.log(' ');
console.log(middleNode(main()));
console.log(' ');

console.log(' ');
console.log(cycle());

/**
 * 8. Cycle in a list
Write an algorithm to find whether a linked list has a cycle (i.e., whether a node in the list has its next value pointing to an earlier node in the list). 
 * @param {object} head - linkedList 
 */
const isCycle = ({ head }) => {
	let temp = head;
	let cycled = new Set();
	while (temp && temp.next !== null) {
		// if set contains node return true
		if (cycled.has(temp.next)) return true;
		// move forward in the list, add current node to the set
		temp = temp.next;
		cycled.add(temp);
	}
	return false;
};
console.log(' ');
console.log(isCycle(cycle()));
console.log(isCycle(main()));

/**
 * 9. Doubly linked list
Implement a doubly linked list. The primary functions of the doubly linked list would be insert (First, Last, Before, After, and At), remove, and find. Write a function mainDLL, and within it create the doubly linked list DLL and add the following items to it: Aquaria, Caprica, Gemenon, Picon, Sagittaron.

Add Tauron to the list
Remove Picon from the list
 */
const doubleLL = () => {
	const DOUBLELL = new DoubleLinkedList();
	DOUBLELL.insertFirst(`First`);
	DOUBLELL.insertLast(`Last`);
	DOUBLELL.insertAt(`Aquaria`, 1);
	DOUBLELL.insertAfter(`Caprica`, `Aquaria`);
	// DOUBLELL.insertBefore(`Gemenon`, `Aquaria`);
	// console.log(DOUBLELL.find(`First`));
	return DOUBLELL;
};
console.log(' ');
console.log(doubleLL());
