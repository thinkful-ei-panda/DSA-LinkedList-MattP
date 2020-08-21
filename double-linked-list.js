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
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.previous = null;
			newNode.next = this.head;
			this.head.previous = newNode;
			this.head = newNode;
		}

		this.length++;
	}
	insertLast(item) {
		let newNode = new _Node(item);

		if (!this.head) {
			this.insertFirst(item);
		} else {
			this.tail.next = newNode;
			newNode.previous = this.tail;
			this.tail = newNode;
		}

		this.length++;
	}
	find(item) {
		// if current node points to null or empty list
		!this.length && null;

		// Start at the head
		let currNode = this.head;
		let end = this.tail;
		if (this.head.value === item) return currNode;
		if (this.tail.value === item) return end;
		// Check the 'value' of the node
		while (currNode.next !== null) {
			// return null if null if reaches the end and item not found
			if (currNode.value === item) return currNode;
			currNode = currNode.next;
		}
		return `Item Not Found`;
	}
	remove(item) {
		// if the list is empty
		!this.head && null;

		let currNode = this.head;
		while (currNode.value !== item) {
			currNode = currNode.next;
		}
		if (currNode === this.head) {
			this.head = currNode.next;
			currNode.next.previous = null;
		} else if (currNode === this.tail) {
			currNode.previous.next = null;
			this.tail = currNode.previous;
		} else {
			currNode.previous.next = currNode.next;
			currNode.next.previous = currNode.previous;
		}
	}
	insertBefore(item, nodeValue) {
		// if list is empty
		!this.length && this.insertFirst(item);

		let currNode = this.head;
		while (currNode.value !== nodeValue && currNode.next !== this.tail) {
			currNode = currNode.next;
		}
		if (currNode.value === nodeValue) {
			const newNode = new _Node(item);
			if (currNode.previous) {
				currNode.previous.next = newNode;
				newNode.previous = currNode.previous;
				newNode.next = currNode;
				currNode.previous = newNode;
			} else {
				this.insertFirst(item);
			}

			this.length++;
		} else {
			console.log(`Item not found`);
		}
	}
	insertAfter(item, nodeValue) {
		// if list is empty, nothing to match
		!this.head && this.insertFirst(item);

		let currNode = this.head;
		while (currNode.value !== nodeValue && currNode !== this.tail) {
			currNode = currNode.next;
		}
		// if current node has the value, create a new node at the next position
		// make new node next, current node next
		if (currNode.value === nodeValue) {
			const newNode = new _Node(item);
			if (currNode.next) {
				currNode.next.previous = newNode;
				newNode.next = currNode.next;
				currNode.next = newNode;
				newNode.previous = currNode;
			} else {
				this.insertLast(item);
			}
			// // check if inserted element was at the tail, if yes then make tail point to it
			// if (this.tail.next !== null) {
			// 	this.tail = this.tail.next;
			// }
			this.length++;
		} // else no where to insert item
		else {
			console.log(`Item not found`);
		}
	}
	insertAt(item, position) {
		!this.length && this.insertFirst(item);
		// index will start at 1
		let currPostition = 1;
		let currNode = this.head;

		while (currPostition !== position && currNode.next !== null) {
			currNode = currNode.next;
			currPostition++;
		}
		const newNode = new _Node(item);

		if (currNode.next !== null) {
			newNode.next = currNode.next;
			currNode.previous.next = newNode;
			newNode.previous = currNode.previous;
			currNode.previous = newNode;
		}

		//check if inserted element was at the tail, if yes then make tail point to it
		if (this.tail.next !== null) {
			this.tail = this.tail.next;
		}
		this.length++;
	}
}

module.exports = DoubleLinkedList;
