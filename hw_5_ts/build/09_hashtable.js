"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ValueError = (function (_super) {
    __extends(ValueError, _super);
    function ValueError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ValueError";
        return _this;
    }
    return ValueError;
}(Error));
var HashTable = (function () {
    function HashTable(size) {
        if (size === void 0) { size = 50; }
        this._length = 0;
        this._size = size;
        this._buckets = new Array(size);
    }
    HashTable.prototype.hash = function (key) {
        var hash = 0;
        for (var i = 0; i < key.toString().length; i++) {
            hash = (hash << 5) + hash + key.charCodeAt(i);
            hash = hash & hash;
            hash = Math.abs(hash);
        }
        return hash % this._size;
    };
    HashTable.prototype._resize = function (newSize) {
        var temp = this._buckets;
        this._size = newSize;
        this._buckets = new Array(this._size);
        this._length = 0;
        for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
            var bucket = temp_1[_i];
            if (bucket) {
                for (var _a = 0, bucket_1 = bucket; _a < bucket_1.length; _a++) {
                    var item = bucket_1[_a];
                    this.addOrSet.apply(this, item);
                }
            }
        }
    };
    HashTable.prototype.addOrSet = function (key, value) {
        var index = this.hash(key);
        var bucket = this._buckets[index];
        if (!bucket) {
            bucket = [];
            this._buckets[index] = bucket;
        }
        var found = false;
        for (var _i = 0, bucket_2 = bucket; _i < bucket_2.length; _i++) {
            var item = bucket_2[_i];
            if (item[0] === key) {
                item[1] = value;
                found = true;
                break;
            }
        }
        if (!found) {
            bucket.push([key, value]);
            this._length++;
            if (this._length / this._size > 0.75) {
                this._resize(this._size * 2);
            }
        }
    };
    HashTable.prototype.contains = function (key) {
        var index = this.hash(key);
        var bucket = this._buckets[index];
        if (!bucket) {
            return false;
        }
        var found = false;
        for (var _i = 0, bucket_3 = bucket; _i < bucket_3.length; _i++) {
            var item = bucket_3[_i];
            if (item[0] === key) {
                found = true;
                break;
            }
        }
        return found;
    };
    HashTable.prototype.get = function (key, nullValue) {
        if (nullValue === void 0) { nullValue = null; }
        var index = this.hash(key);
        var bucket = this._buckets[index];
        if (!bucket) {
            return nullValue;
        }
        for (var _i = 0, bucket_4 = bucket; _i < bucket_4.length; _i++) {
            var item = bucket_4[_i];
            if (item[0] === key) {
                return item[1];
            }
        }
        return nullValue;
    };
    HashTable.prototype.delete = function (key) {
        var index = this.hash(key);
        if (!this.contains(key)) {
            throw new ValueError("Key ".concat(key.toString(), " not found."));
        }
        var bucket = this._buckets[index];
        for (var i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._length--;
            }
            if (this._length / this._size < 0.25) {
                this._resize(this._size / 2);
            }
        }
    };
    HashTable.prototype.set = function (key, value) {
        var index = this.hash(key);
        if (!this.contains(key)) {
            throw new ValueError("Key ".concat(key.toString(), " not found."));
        }
        var bucket = this._buckets[index];
        for (var _i = 0, bucket_5 = bucket; _i < bucket_5.length; _i++) {
            var item = bucket_5[_i];
            if (item[0] === key) {
                item[1] = value;
                break;
            }
        }
    };
    Object.defineProperty(HashTable.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HashTable.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    return HashTable;
}());
console.log("-------- 09_hashtable.ts --------");
var hashTable = new HashTable();
console.log('hashTable.addOrSet("a", 1)');
hashTable.addOrSet("a", 1);
console.log('hashTable.addOrSet("b", 2)');
hashTable.addOrSet("b", 2);
console.log('hashTable.addOrSet("c", 3)');
hashTable.addOrSet("c", 3);
console.log("hashTable =", hashTable, "length =", hashTable.length);
console.log('hashTable.contains("a")');
console.log(hashTable.contains("a"));
console.log('hashTable.contains("z")');
console.log(hashTable.contains("z"));
console.log('hashTable.get("b")');
console.log(hashTable.get("b"));
console.log('hashTable.get("z")');
console.log(hashTable.get("z"));
console.log('hashTable.delete("c")');
hashTable.delete("c");
console.log("hashTable =", hashTable, "length =", hashTable.length);
console.log('hashTable.set("b", 11)');
hashTable.set("b", 11);
console.log("hashTable =", hashTable, "length =", hashTable.length);
console.log("size =", hashTable.size);
//# sourceMappingURL=09_hashtable.js.map