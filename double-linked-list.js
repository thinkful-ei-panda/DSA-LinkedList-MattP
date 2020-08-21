class _Node {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.previous = null;
	}
}

class DoubleLinkedList {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}
	insertFirst(item) {
		const newNode = new _Node(item);
		if (!this.length) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head.prev = newNode;
			this.head = newNode;
		}
		this.length++;
	}
	insertLast(item) {
		const newNode = new _Node(item);
		if (!this.length) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.previous = this.tail;
			this.tail = newNode;
		}
		this.length++;
	}
	find(item) {
		// Start at the head
		let start = this.head;
		let end = this.tail;
		// if current node points to null or empty list
		!this.length && null;

		if (start.value === item) return start;
		if (end.value === item) return end;
		// Check the 'value' of the node
		while (start.value !== item) {
			// return null if null if reaches the end and item not found
			start.next === end ? null : (start = start.next);
		}
		return start;
	}
	remove(item) {
		// if the list is empty
		!this.head
			? null // if the node to be removed is head, make the head.next head
			: this.head.value === item && (this.head = this.head.next);
		let currNode = this.head;
		// keep track of previous node
		let prevNode = this.head;
		while (currNode !== null && currNode.value !== item) {
			// save the previous node
			prevNode = currNode;
			currNode = currNode.next;
		}
		if (currNode === null) {
			console.log(`Item not found`);
		} else {
			prevNode.next = currNode.next;
			prevNode.previous = currNode.previous;
		}
	}
	insertBefore(item, nodeValue) {
		// if list is empty
		!this.length && console.log(`List is empty`);

		// if head contains node value
		this.head.value === nodeValue && this.insertFirst(item);

		let currNode = this.head;
		while (currNode.value !== nodeValue && currNode.next !== this.tail) {
			currNode = currNode.next;
		}
		if (currNode.value === nodeValue) {
			const newNode = new _Node(item);
			if (currNode.next !== null) {
				currNode.next.previous = newNode;
			}
			newNode.next = currNode;
			currNode.previous = newNode;

			this.length++;
		} else {
			console.log(`Item not found`);
		}
	}
	insertAfter(item, nodeValue) {
		// if list is empty, nothing to match
		if (!this.length) {
			console.log(`List is empty`);
		}

		let currNode = this.head;
		while (currNode.value !== nodeValue && currNode !== this.tail) {
			currNode = currNode.next;
		}
		// if current node has the value, create a new node at the next position
		// make new node next, current node next
		if (currNode.value === nodeValue) {
			const newNode = new _Node(item);
			newNode.next = currNode.next;

			if (currNode.previous !== null) {
				currNode.next.previous = newNode;
			}
			newNode.previous = currNode;

			currNode.next = newNode;
			// check if inserted element was at the tail, if yes then make tail point to it
			if (this.tail.next !== null) {
				this.tail = this.tail.next;
			}
			this.length++;
		}
		// else no where to insert item
		else {
			console.log(`Item not found`);
		}
	}
	insertAt(item, position) {
		!this.head && console.log(`List is empty`);

		// index will start at 1
		let currPostition = 1;
		let currNode = this.head;
		// let prevNode = this.head;
		while (currPostition !== position && currNode.next !== null) {
			// prevNode = currNode;
			currNode = currNode.next;
			currPostition++;
		}
		const newNode = new _Node(item);
		newNode.next = currNode.next;

		if (currNode.next !== null) {
			currNode.next.previous = newNode;
		}
		newNode.previous = currNode;
		currNode.next = newNode;

		// check if inserted element was at the tail, if yes then make tail point to it
		if (this.tail.next !== null) {
			this.tail = this.tail.next;
		}
		this.length++;
	}
}

module.exports = DoubleLinkedList;
