class ValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValueError"
  }
}

interface IHashTableKey {
  toString: () => string
  charCodeAt: (i: number) => number
}

interface IHashtable<TKey, TValue> {
  addOrSet(key: TKey, value: TValue): void
  contains(key: TKey): boolean
  get(key: TKey, nullValue: TValue | null): TValue | null
  delete(key: TKey): void
  set(key: TKey, value: TValue): void
}

class HashTable<TKey extends IHashTableKey, TValue> implements IHashtable<TKey, TValue> {
  private _size: number
  private _length: number = 0
  private _buckets: [TKey, TValue][][] | [][]

  constructor(size: number = 50) {
    this._size = size
    this._buckets = new Array(size)
  }

  hash(key: TKey): number {
    let hash: number = 0
    for (let i = 0; i < key.toString().length; i++) {
      hash = (hash << 5) + hash + key.charCodeAt(i)
      hash = hash & hash
      hash = Math.abs(hash)
    }
    return hash % this._size
  }

  private _resize(newSize: number): void {
    let temp = this._buckets
    this._size = newSize
    this._buckets = new Array(this._size)
    this._length = 0

    for (let bucket of temp) {
      if (bucket) {
        for (let item of bucket) {
          this.addOrSet(...item)
        }
      }
    }
  }

  // Вставка элемента или обновление если существует
  addOrSet(key: TKey, value: TValue): void {
    const index = this.hash(key)

    let bucket: [TKey, TValue][] = this._buckets[index]

    if (!bucket) {
      bucket = []
      this._buckets[index] = bucket
    }

    let found: boolean = false

    for (let item of bucket) {
      if (item[0] === key) {
        item[1] = value
        found = true
        break
      }
    }

    if (!found) {
      bucket.push([key, value])

      this._length++
      if (this._length / this._size > 0.75) {
        this._resize(this._size * 2)
      }
    }
  }

  // Проверка на существование
  contains(key: TKey): boolean {
    const index = this.hash(key)

    let bucket: [TKey, TValue][] = this._buckets[index]
    if (!bucket) {
      return false
    }

    let found: boolean = false

    for (let item of bucket) {
      if (item[0] === key) {
        found = true
        break
      }
    }

    return found
  }

  // Получение элемента по ключу
  get(key: TKey, nullValue: TValue | null = null): TValue | null {
    const index = this.hash(key)

    let bucket: [TKey, TValue][] = this._buckets[index]
    if (!bucket) {
      return nullValue
    }

    for (let item of bucket) {
      if (item[0] === key) {
        return item[1]
      }
    }

    return nullValue
  }

  // Удаление элемента
  delete(key: TKey): void {
    const index = this.hash(key)

    if (!this.contains(key)) {
      throw new ValueError(`Key ${key.toString()} not found.`)
    }

    let bucket: [TKey, TValue][] = this._buckets[index]

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1)
        this._length--
      }
      if (this._length / this._size < 0.25) {
        this._resize(this._size / 2)
      }
    }
  }

  // Изменение элемента
  set(key: TKey, value: TValue): void {
    const index = this.hash(key)

    if (!this.contains(key)) {
      throw new ValueError(`Key ${key.toString()} not found.`)
    }

    let bucket: [TKey, TValue][] = this._buckets[index]

    for (let item of bucket) {
      if (item[0] === key) {
        item[1] = value
        break
      }
    }
  }

  get length(): number {
    return this._length
  }

  get size(): number {
    return this._size
  }
}
console.log("-------- 09_hashtable.ts --------")

let hashTable = new HashTable<string, number>()

console.log('hashTable.addOrSet("a", 1)')
hashTable.addOrSet("a", 1)

console.log('hashTable.addOrSet("b", 2)')
hashTable.addOrSet("b", 2)

console.log('hashTable.addOrSet("c", 3)')
hashTable.addOrSet("c", 3)

console.log("hashTable =", hashTable, "length =", hashTable.length) // HashTable{_length: 3, _size: 50, _buckets: [47: ['a', 1], 48: ['b', 2], 49: ['c', 3]]}

console.log('hashTable.contains("a")')
console.log(hashTable.contains("a")) // true

console.log('hashTable.contains("z")')
console.log(hashTable.contains("z")) // false

console.log('hashTable.get("b")')
console.log(hashTable.get("b")) // 2

console.log('hashTable.get("z")')
console.log(hashTable.get("z")) // null

console.log('hashTable.delete("c")')
hashTable.delete("c")

console.log("hashTable =", hashTable, "length =", hashTable.length) // HashTable{_length: 2, _size: 25, _buckets: [22: ['a', 1], 23: ['b', 2]]}

console.log('hashTable.set("b", 11)')
hashTable.set("b", 11)

console.log("hashTable =", hashTable, "length =", hashTable.length) // HashTable{_length: 2, _size: 25, _buckets: [22: ['a', 1], 23: ['b', 11]]}
console.log("size =", hashTable.size) // size = 25
