class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }

  height() {
    return 1 + Math.max(this.left !== null ? this.left.height() : -1, this.right !== null ? this.right.height() : -1)
  }
}

class BinarySearchTree {
  root = null
  _length = 0

  get length() {
    return this._length
  }

  height() {
    return this.root === null ? -1 : this.root.height() + 1
  }

  constructor() {}

  fill(arr) {
    arr.forEach((el) => this.insert(el))
  }

  insert(value) {
    let node = new Node(value)

    if (this.root == null) {
      this.root = node
    } else {
      this.appendNode(this.root, node)
    }
  }

  appendNode(toNode, node) {
    if (node.value < toNode.value) {
      if (toNode.left == null) {
        toNode.left = node
        this._length++
      } else {
        this.appendNode(toNode.left, node)
      }
    } else {
      if (toNode.right == null) {
        toNode.right = node
        this._length++
      } else {
        this.appendNode(toNode.right, node)
      }
    }
  }

  remove(value) {
    this.root = this.removeNode(this.root, value)
    this._length--
  }

  removeNode(node, value) {
    if (node === null) return node

    if (value === node.value) {
      if (node.left === null && node.right === null) {
        return null
      } else if (node.left === null) {
        return node.right
      } else if (node.right === null) {
        return node.left
      } else {
        let tempNode = this.findMinNode(node.right)
        node.value = tempNode.value

        node.right = this.removeNode(node.right, tempNode.value)
        return node
      }
    } else if (value < node.value) {
      node.left = this.removeNode(node.left, value)
      return node
    } else {
      node.right = this.removeNode(node.right, value)
      return node
    }
  }

  findMinNode(node) {
    while (!node.left == null) node = node.left

    return node
  }

  search(node, value) {
    if (node == null) return null
    else if (value < node.value) return this.search(node.left, value)
    else if (value > node.value) return this.search(node.right, value)

    return node
  }

  replace(oldValue, newValue) {
    let node = this.search(this.root, oldValue)

    if (node != null) {
      node.value = newValue
    }
  }
}

let tree = new BinarySearchTree()
tree.fill([8, 4, 2, 10, 5, 6, 9, 11])

//        8
//      /   \
//     4     10
//    / \   /  \
//   2   5 9    11
//        \
//         6

tree.height()
// 4

tree.remove(6)

//        8
//      /   \
//     4     10
//    / \   /  \
//   2   5 9    11

tree.height()
// 3

tree.search(tree.root, 6)
// null

console.log(tree.search(tree.root, 4))
//Node {
//  value: 4,
//  left: Node { value: 2, left: null, right: null },
//  right: Node { value: 5, left: null, right: null }
//}

tree.remove(8)
//        10
//      /    \
//     4     11
//    / \   /
//   2   5 9

tree.replace(11, 6)
//        10
//      /    \
//     4      6
//    / \    /
//   2   5  9
