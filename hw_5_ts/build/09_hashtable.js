"use strict";
class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValueError";
    }
}
class HashTable {
    constructor(size = 50) {
        this._length = 0;
        this._size = size;
        this._buckets = new Array(size);
    }
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.toString().length; i++) {
            hash = (hash << 5) + hash + key.charCodeAt(i);
            hash = hash & hash;
            hash = Math.abs(hash);
        }
        return hash % this._size;
    }
    _resize(newSize) {
        let temp = this._buckets;
        this._size = newSize;
        this._buckets = new Array(this._size);
        this._length = 0;
        for (let bucket of temp) {
            if (bucket) {
                for (let item of bucket) {
                    this.addOrSet(...item);
                }
            }
        }
    }
    addOrSet(key, value) {
        const index = this.hash(key);
        let bucket = this._buckets[index];
        if (!bucket) {
            bucket = [];
            this._buckets[index] = bucket;
        }
        let found = false;
        for (let item of bucket) {
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
    }
    contains(key) {
        const index = this.hash(key);
        let bucket = this._buckets[index];
        if (!bucket) {
            return false;
        }
        let found = false;
        for (let item of bucket) {
            if (item[0] === key) {
                found = true;
                break;
            }
        }
        return found;
    }
    get(key, nullValue = null) {
        const index = this.hash(key);
        let bucket = this._buckets[index];
        if (!bucket) {
            return nullValue;
        }
        for (let item of bucket) {
            if (item[0] === key) {
                return item[1];
            }
        }
        return nullValue;
    }
    delete(key) {
        const index = this.hash(key);
        if (!this.contains(key)) {
            throw new ValueError(`Key ${key.toString()} not found.`);
        }
        let bucket = this._buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._length--;
            }
            if (this._length / this._size < 0.25) {
                this._resize(this._size / 2);
            }
        }
    }
    set(key, value) {
        const index = this.hash(key);
        if (!this.contains(key)) {
            throw new ValueError(`Key ${key.toString()} not found.`);
        }
        let bucket = this._buckets[index];
        for (let item of bucket) {
            if (item[0] === key) {
                item[1] = value;
                break;
            }
        }
    }
    get length() {
        return this._length;
    }
    get size() {
        return this._size;
    }
}
console.log("-------- 09_hashtable.ts --------");
let hashTable = new HashTable();
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