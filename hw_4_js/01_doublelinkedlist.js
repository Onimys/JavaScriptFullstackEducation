class Node {
  constructor(value, next = null, prev = null) {
    this.value = value
    this.next = next
    this.prev = prev
  }

  toString() {
    return `${this.value}`
  }
}

class DoublyLinkedList {
  constructor() {
    this._root = null
    this._last = null
    this._length = 0
  }

  // Получение кол-ва элементов списка
  get length() {
    return this._length
  }

  // Вставка нового элемента в конец
  push(value) {
    const newNode = new Node(value)

    if (this._last) {
      this._last.next = newNode
    }

    newNode.prev = this._last
    this._last = newNode

    if (!this._root) {
      this._root = newNode
    }

    this._length++

    return this
  }

  // Вставка нового элемента в начало
  unshift(value) {
    const newNode = new Node(value, this._root)
    if (this._root) {
      this._root.previous = newNode
    }

    this._root = newNode

    if (!this._last) {
      this._last = newNode
    }

    this._length++

    return this
  }

  // Поиск первого узла, содержащего указанное значение
  find(value) {
    if (!this._root) {
      return null
    }

    let index = -1
    let current = this._root
    while (current) {
      if (value && current.value === value) {
        return [current, index + 1]
      }

      index++
      current = current.next
    }

    return null
  }

  // Замента всех элементов, содержащих указанное значение
  replace(oldValue, newvalue) {
    if (oldValue === newvalue) {
      return this
    }

    if (!this._root) {
      return null
    }

    let current = this._root

    while (current) {
      if (current.value === oldValue) {
        current.value = newvalue
      }

      current = current.next
    }

    return this
  }

  // Удаление всех элементов, содержащих указанное значение
  delete(value) {
    if (!this._root) {
      return null
    }

    let deleted = null
    let current = this._root
    while (current) {
      if (current.value === value) {
        deleted = current

        if (deleted === this._root) {
          this._root = deleted.next

          if (this._root) {
            this._root.prev = null
          }

          if (deleted === this._last) {
            this._last = null
          }
        } else if (deleted === this._last) {
          this._last = deleted.prev
          this._last.next = null
        } else {
          const previousNode = deleted.prev
          const nextNode = deleted.next

          previousNode.next = nextNode
          nextNode.prev = previousNode
        }

        this._length--
      }

      current = current.next
    }

    return deleted
  }

  // Преобразование в массив
  toArray() {
    const nodes = []

    let currentNode = this._root

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  // Вывод в консоль
  toString() {
    return this.toArray()
      .map((node) => node.toString())
      .join("<->")
  }
}

let list = new DoublyLinkedList()

list.push(8)
list.push(4)
list.push(13)

console.log(list.toString()) // 8<->4<->13
console.log(list.length) // 3

list.unshift(2)

console.log(list.toString()) // 2<->8<->4<->13
console.log("length =", list.length) // 4

console.log(list.find(4)) // [Node{value: 4, ....}, 2], где [node: Node, index: number]

list.push(4)
console.log(list.toString()) // 2<->8<->4<->13<->4
console.log("length =", list.length) // 5

list.delete(4)
console.log(list.toString()) // 2<->8<->13
console.log("length =", list.length) // 3

list.unshift(8)
console.log(list.toString()) // 8<->2<->8<->13

list.replace(8, 1)
console.log(list.toString()) // 1<->2<->1<->13
