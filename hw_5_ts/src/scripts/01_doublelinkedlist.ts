type Nullable<T> = T | null

class ListNode<T> {
  private _value: T
  public next: Nullable<ListNode<T>>
  public prev: Nullable<ListNode<T>>

  constructor(value: T, next: Nullable<ListNode<T>> = null, prev: Nullable<ListNode<T>> = null) {
    this._value = value
    this.next = next
    this.prev = prev
  }

  get value(): T {
    return this._value
  }

  set value(newValue: T) {
    this._value = newValue
  }

  toString(): string {
    return `${this.value}`
  }
}

class DoublyLinkedList<T> {
  private _root: Nullable<ListNode<T>> = null
  private _last: Nullable<ListNode<T>> = null
  private _length: number = 0

  constructor() {}

  // Получение кол-ва элементов списка
  get length(): number {
    return this._length
  }

  // Вставка нового элемента в конец
  push(value: T): DoublyLinkedList<T> {
    const newNode = new ListNode<T>(value)

    if (this._last) {
      this._last.next = newNode
    }

    newNode.prev = this._last ?? null
    this._last = newNode

    if (!this._root) {
      this._root = newNode
    }

    this._length++

    return this
  }

  // Вставка нового элемента в начало
  unshift(value: T): DoublyLinkedList<T> {
    const newNode = new ListNode<T>(value, this._root)
    if (this._root) {
      this._root.prev = newNode
    }

    this._root = newNode

    if (!this._last) {
      this._last = newNode
    }

    this._length++

    return this
  }

  // Поиск первого узла, содержащего указанное значение
  find(value: T): [ListNode<T>, number] | null {
    if (!this._root) {
      return null
    }

    let index: number = -1
    let current: Nullable<ListNode<T>> = this._root

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
  replace(oldValue: T, newvalue: T): Nullable<DoublyLinkedList<T>> {
    if (oldValue === newvalue) {
      return this
    }

    if (!this._root) {
      return null
    }

    let current: Nullable<ListNode<T>> = this._root

    while (current) {
      if (current.value === oldValue) {
        current.value = newvalue
      }

      current = current.next
    }

    return this
  }

  // Удаление всех элементов, содержащих указанное значение
  delete(value: T): Nullable<DoublyLinkedList<T>> {
    if (!this._root) {
      return null
    }

    let deleted: ListNode<T>
    let current: Nullable<ListNode<T>> = this._root
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

          if (this._last) {
            this._last.next = null
          }
        } else {
          const previousNode: Nullable<ListNode<T>> = deleted.prev
          const nextNode: Nullable<ListNode<T>> = deleted.next

          if (previousNode) previousNode.next = nextNode
          if (nextNode) nextNode.prev = previousNode
        }

        this._length--
      }

      current = current.next
    }

    return this
  }

  // Преобразование в массив
  toArray(): Array<ListNode<T>> {
    const nodes = []

    let currentNode = this._root

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  // Вывод в консоль
  toString(): string {
    return this.toArray()
      .map((node) => node.toString())
      .join("<->")
  }
}
console.log("-------- 01_doublelinkedlist.ts --------")

let list = new DoublyLinkedList<number>()

/* push */
console.log("list.push(8)")
list.push(8)
console.log("list.push(4)")
list.push(4)
console.log("list.push(13)")
list.push(13)

console.log("list =", list.toString(), "length =", list.length) // list = 8<->4<->13 length = 3

/*unshift*/
console.log("list.unshift(2)")
list.unshift(2)

console.log("list =", list.toString(), "length =", list.length) // list = 2<->8<->4<->13 length = 4

/* find */
console.log("list.find(4) =", list.find(4)) // [ListNode, 2]

/* delete */
console.log("list.push(4)")
list.push(4)
console.log("list =", list.toString(), "length =", list.length) // list = 2<->8<->4<->13<->4 length = 5

console.log("list.delete(4)")
list.delete(4)
console.log("list =", list.toString(), "length =", list.length) // list = 2<->8<->13 length = 3

/* replace */
console.log("list.unshift(8)")
list.unshift(8)
console.log("list =", list.toString(), "length =", list.length) // list = 2<->8<->4<->13<->4 length = 5

console.log("list.replace(8, 1)")
list.replace(8, 1)
console.log("list =", list.toString(), "length =", list.length) // list = 2<->8<->4<->13<->4 length = 5

/* type error */
console.log("list.push('Hello ts')")
console.log("Error:(230, 11) TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.")
