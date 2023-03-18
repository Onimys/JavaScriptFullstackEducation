class HashTable {
  constructor() {
    this._values = {}
    this._length = 0
  }

  calculateHash(key) {
    let hash = 0
    for (let i = 0, len = key.length; i < len; i++) {
      let chr = key.toString().charCodeAt(i)
      hash = (hash << 5) - hash + chr
      hash |= 0
    }
    return hash
  }

  // Вставка элемента или обновление если существует
  addOrSet(key, value) {
    const hash = this.calculateHash(key)

    if (!this._values.hasOwnProperty(hash)) {
      this._values[hash] = {}
    }
    if (!this._values[hash].hasOwnProperty(key)) {
      this._length++
    }
    this._values[hash][key] = value
  }

  // Проверка на существование
  contains(key) {
    const hash = this.calculateHash(key)
    return this._values.hasOwnProperty(hash) && this._values[hash].hasOwnProperty(key)
  }

  // Удаление элемента
  delete(key) {
    const hash = this.calculateHash(key)

    if (this.contains(key)) {
      delete this._values[hash]
      this._length--
    }
  }

  // Получение элемента по ключу
  get(key) {
    const hash = this.calculateHash(key)
    if (this._values.hasOwnProperty(hash) && this._values[hash].hasOwnProperty(key)) {
      return this._values[hash][key]
    }
    return null
  }

  // Изменение элемента
  set(key, value) {
    const hash = this.calculateHash(key)
    if (this.contains(key)) {
      this._values[hash][key] = value
      return this._values[hash]
    }

    return null
  }

  get length() {
    return this._length
  }
}

let hashTable = new HashTable()
hashTable.addOrSet("a", 1)
hashTable.addOrSet("b", 2)
hashTable.addOrSet("c", 3)

console.log(hashTable) // { '97': { a: 1 }, '98': { b: 2 }, '99': { c: 3 } }
console.log("length =", hashTable.length) // 3

console.log(hashTable.contains("a")) // true
console.log(hashTable.contains("z")) // false

console.log(hashTable.get("a")) // 1
console.log(hashTable.get("z")) // null

hashTable.delete("c")
console.log(hashTable) // { '97': { a: 1 }, '98': { b: 2 } }
console.log("length =", hashTable.length) // 2

hashTable.set("b", 11)
console.log(hashTable) //  { '97': { a: 1 }, '98': { b: 11 } },
