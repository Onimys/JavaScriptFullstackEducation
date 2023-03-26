type Vertex = number
type Edge = [u: Vertex, v: Vertex, w: number]

export class Graph {
  private graph: Edge[] = []
  private E: number = 0

  constructor(private readonly V: number) {}

  addEdge(edge: Edge) {
    this.graph.push(edge)
    this.E++
  }

  BellmanFord(source: Vertex) {
    let dist: number[] = Array(this.V).fill(Infinity)

    dist[source] = 0

    for (let i = 0; i < this.V - 1; i++) {
      for (let j = 0; j < this.E; j++) {
        if (dist[this.graph[j][0]] + this.graph[j][2] < dist[this.graph[j][1]])
          dist[this.graph[j][1]] = dist[this.graph[j][0]] + this.graph[j][2]
      }
    }

    for (let i = 0; i < this.E; i++) {
      const x = this.graph[i][0]
      const y = this.graph[i][1]

      const weight = this.graph[i][2]
      if (dist[x] != 1000000000 && dist[x] + weight < dist[y]) console.log("Graph contains negative weight cycle")
    }

    this.printDistance(source, dist)
  }

  printDistance(source: Vertex, dist: number[]) {
    console.log(`Distance from source = ${source}:`)
    dist.forEach((n: number, index: number) => console.log(`${index} ${dist[index]}`))
  }
}
