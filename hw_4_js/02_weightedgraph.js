class WeightedGraph {
  list = new Map()
  _length = 0

  get length() {
    return this._length
  }
  constructor() {}

  addVertex(vertex) {
    this.list.set(vertex, [])
    this._length++
  }

  addEdge(vertexFrom, vertexTo, weight) {
    this.list.get(vertexFrom).push({ node: vertexTo, weight })
    this.list.get(vertexTo).push({ node: vertexFrom, weight })
  }

  updateEdge(vertexFrom, vertexTo, newWeight) {
    let nodes = this.list.get(vertexFrom)
    nodes.forEach((v) => {
      if (v.node === vertexTo) v.weight = newWeight
    })
    this.list.set(vertexFrom, nodes)

    nodes = this.list.get(vertexTo)
    nodes.forEach((v) => {
      if (v.node === vertexFrom) v.weight = newWeight
    })
    this.list.set(vertexTo, nodes)
  }

  removeEdge(vertexFrom, vertexTo) {
    this.list.set(
      vertexFrom,
      this.list.get(vertexFrom).filter((v) => v.node !== vertexTo),
    )
    this.list.set(
      vertexTo,
      this.list.get(vertexTo).filter((v) => v.node !== vertexFrom),
    )
  }

  removeVertex(vertex) {
    const edges = this.list.get(vertex)
    edges.forEach((e) => this.removeEdge(e.node, vertex))
    this.list.delete(vertex)
    this._length--
  }

  findPath(from, to) {
    let shortestDistanceNode = (distances, visited) => {
      let shortest = null

      for (let node in distances) {
        let currentIsShortest = shortest == null || distances[node] < distances[shortest]

        if (currentIsShortest && !visited.includes(node)) {
          shortest = node
        }
      }
      return shortest
    }

    let distances = {}
    distances[from] = "Infinity"
    this.list.get(from).forEach((v) => (distances[v.node] = v.weight))

    let parents = { end: null }
    for (let child in this.list.get(from)) {
      parents[child.node] = from
    }

    let visited = []

    let node = shortestDistanceNode(distances, visited)
    while (node) {
      let distance = distances[node]

      let children = {}
      this.list.get(node).forEach((v) => (children[v.node] = v.weight))

      for (let child in children) {
        if (String(child) === String(from)) {
          continue
        } else {
          let newDistance = distance + children[child]
          if (!distances[child] || distances[child] > newDistance) {
            distances[child] = newDistance
            parents[child] = node
          }
        }
      }

      visited.push(node)
      node = shortestDistanceNode(distances, visited)
    }

    let shortestPath = [to]
    let parent = parents[to]
    while (parent) {
      shortestPath.push(parent)
      parent = parents[parent]
    }
    shortestPath.reverse()

    let results = {
      distance: distances[to],
      path: [from].concat(shortestPath),
    }

    return results
  }

  toString() {
    for (let i of this.list.keys()) {
      let outStr = ""

      for (let j of this.list.get(i)) {
        outStr += j + " "
      }

      console.log(i + " -> " + outStr)
    }
  }
}

let graph = new WeightedGraph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.length // 6

graph.addEdge("A", "B", 10)
graph.addEdge("B", "C", 2)
graph.addEdge("C", "D", 4)
graph.addEdge("D", "F", 7)
graph.addEdge("A", "F", 2)
graph.addEdge("A", "E", 4)
graph.addEdge("A", "D", 12)
//       2
//     B - C
// 10 / 12  \ 4
//   A   -   D
// 4 \  \2 / 7
//    E   F

graph.removeVertex("F")
//       2
//     B - C
// 10 / 12  \ 4
//   A   -   D
//  4 \
//     E

graph.length // 5

console.log(graph.findPath("D", "E"))
// { distance: 16, path: [ 'D', 'A', 'E' ] }
//      12
//   Z  -  D
//  4 \
//     E
