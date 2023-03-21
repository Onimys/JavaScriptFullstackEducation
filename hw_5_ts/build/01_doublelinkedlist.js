"use strict";
class ListNode {
    constructor(value, next = null, prev = null) {
        this._value = value;
        this.next = next;
        this.prev = prev;
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        this._value = newValue;
    }
    toString() {
        return `${this.value}`;
    }
}
class DoublyLinkedList {
    constructor() {
        this._root = null;
        this._last = null;
        this._length = 0;
    }
    get length() {
        return this._length;
    }
    push(value) {
        var _a;
        const newNode = new ListNode(value);
        if (this._last) {
            this._last.next = newNode;
        }
        newNode.prev = (_a = this._last) !== null && _a !== void 0 ? _a : null;
        this._last = newNode;
        if (!this._root) {
            this._root = newNode;
        }
        this._length++;
        return this;
    }
    unshift(value) {
        const newNode = new ListNode(value, this._root);
        if (this._root) {
            this._root.prev = newNode;
        }
        this._root = newNode;
        if (!this._last) {
            this._last = newNode;
        }
        this._length++;
        return this;
    }
    find(value) {
        if (!this._root) {
            return null;
        }
        let index = -1;
        let current = this._root;
        while (current) {
            if (value && current.value === value) {
                return [current, index + 1];
            }
            index++;
            current = current.next;
        }
        return null;
    }
    replace(oldValue, newvalue) {
        if (oldValue === newvalue) {
            return this;
        }
        if (!this._root) {
            return null;
        }
        let current = this._root;
        while (current) {
            if (current.value === oldValue) {
                current.value = newvalue;
            }
            current = current.next;
        }
        return this;
    }
    delete(value) {
        if (!this._root) {
            return null;
        }
        let deleted;
        let current = this._root;
        while (current) {
            if (current.value === value) {
                deleted = current;
                if (deleted === this._root) {
                    this._root = deleted.next;
                    if (this._root) {
                        this._root.prev = null;
                    }
                    if (deleted === this._last) {
                        this._last = null;
                    }
                }
                else if (deleted === this._last) {
                    this._last = deleted.prev;
                    if (this._last) {
                        this._last.next = null;
                    }
                }
                else {
                    const previousNode = deleted.prev;
                    const nextNode = deleted.next;
                    if (previousNode)
                        previousNode.next = nextNode;
                    if (nextNode)
                        nextNode.prev = previousNode;
                }
                this._length--;
            }
            current = current.next;
        }
        return this;
    }
    toArray() {
        const nodes = [];
        let currentNode = this._root;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }
    toString() {
        return this.toArray()
            .map((node) => node.toString())
            .join("<->");
    }
}
console.log("-------- 01_doublelinkedlist.ts --------");
let list = new DoublyLinkedList();
console.log("list.push(8)");
list.push(8);
console.log("list.push(4)");
list.push(4);
console.log("list.push(13)");
list.push(13);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.unshift(2)");
list.unshift(2);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.find(4) =", list.find(4));
console.log("list.push(4)");
list.push(4);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.delete(4)");
list.delete(4);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.unshift(8)");
list.unshift(8);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.replace(8, 1)");
list.replace(8, 1);
console.log("list =", list.toString(), "length =", list.length);
console.log("list.push('Hello ts')");
console.log("Error:(230, 11) TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.");
//# sourceMappingURL=01_doublelinkedlist.js.map