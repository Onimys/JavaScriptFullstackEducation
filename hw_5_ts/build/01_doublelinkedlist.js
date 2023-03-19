"use strict";
var ListNode = (function () {
    function ListNode(value, next, prev) {
        if (next === void 0) { next = null; }
        if (prev === void 0) { prev = null; }
        this._value = value;
        this.next = next;
        this.prev = prev;
    }
    Object.defineProperty(ListNode.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (newValue) {
            this._value = newValue;
        },
        enumerable: false,
        configurable: true
    });
    ListNode.prototype.toString = function () {
        return "".concat(this.value);
    };
    return ListNode;
}());
var DoublyLinkedList = (function () {
    function DoublyLinkedList() {
        this._root = null;
        this._last = null;
        this._length = 0;
    }
    Object.defineProperty(DoublyLinkedList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    DoublyLinkedList.prototype.push = function (value) {
        var _a;
        var newNode = new ListNode(value);
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
    };
    DoublyLinkedList.prototype.unshift = function (value) {
        var newNode = new ListNode(value, this._root);
        if (this._root) {
            this._root.prev = newNode;
        }
        this._root = newNode;
        if (!this._last) {
            this._last = newNode;
        }
        this._length++;
        return this;
    };
    DoublyLinkedList.prototype.find = function (value) {
        if (!this._root) {
            return null;
        }
        var index = -1;
        var current = this._root;
        while (current) {
            if (value && current.value === value) {
                return [current, index + 1];
            }
            index++;
            current = current.next;
        }
        return null;
    };
    DoublyLinkedList.prototype.replace = function (oldValue, newvalue) {
        if (oldValue === newvalue) {
            return this;
        }
        if (!this._root) {
            return null;
        }
        var current = this._root;
        while (current) {
            if (current.value === oldValue) {
                current.value = newvalue;
            }
            current = current.next;
        }
        return this;
    };
    DoublyLinkedList.prototype.delete = function (value) {
        if (!this._root) {
            return null;
        }
        var deleted;
        var current = this._root;
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
                    var previousNode = deleted.prev;
                    var nextNode = deleted.next;
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
    };
    DoublyLinkedList.prototype.toArray = function () {
        var nodes = [];
        var currentNode = this._root;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    };
    DoublyLinkedList.prototype.toString = function () {
        return this.toArray()
            .map(function (node) { return node.toString(); })
            .join("<->");
    };
    return DoublyLinkedList;
}());
console.log("-------- 01_doublelinkedlist.ts --------");
var list = new DoublyLinkedList();
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