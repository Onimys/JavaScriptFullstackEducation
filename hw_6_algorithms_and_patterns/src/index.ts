import { Builder, DbSettings } from "./patterns/01_builder.js"
import { DatabaseUserPermission, DatabaseUserService, User, UserRole } from "./patterns/02_proxy.js"
import { WorkerRoom, NotificationWorker } from "./patterns/03_mediator.js"
import { Graph } from "./algorithms/01_bellmanford.js"

/*
 * ALGORITHMS
 */
const graph = new Graph(5)

graph.addEdge([0, 1, 2])
graph.addEdge([0, 2, 1])
graph.addEdge([1, 3, 4])
graph.addEdge([2, 3, 1])
graph.addEdge([3, 0, 2])
graph.addEdge([3, 4, 1])

//     1    4
//   2/ \3 /
//  0 -2- 3
//   1\ /1
//     2

graph.BellmanFord(2)

/*
 * PATTERNS: builder, proxy, mediator
 * */

/* 01_builder */
console.log("/* PATTERNS: builder, proxy, mediator */")
console.log("/*---------------- 01_builder ----------------*/")

const db = new Builder<DbSettings>()
  .set("host", "127.0.0.1")
  .set("port", 5432)
  .set("username", "admin")
  .set("password", "admin")
  .set("db", "test")
  .set("schema", "public")
  .build()
console.log(db) // {host: '127.0.0.1', port: 5432, username: 'admin', password: 'admin', db: 'test', schema: 'public'}

/* 02_proxy */
console.log("/*---------------- 02_proxy ----------------*/")

const userApi = new DatabaseUserPermission(new DatabaseUserService())
try {
  userApi.add(new User("admin", "admin", UserRole.Admin)) // Error: Forbidden create admin user.
} catch {
  console.log("Error: Forbidden create admin user.")
}

userApi.add(new User("user1", "user1", UserRole.User))
userApi.add(new User("user2", "user2", UserRole.User))
userApi.add(new User("user3", "user3", UserRole.User))

console.log(userApi)
// users: Array(4)
// 0: User {username: 'admin', fullname: 'admin', role: 1}
// 1: User {username: 'user1', fullname: 'user1', role: 0}
// 2: User {username: 'user2', fullname: 'user2', role: 0}
// 3: User {username: 'user3', fullname: 'user3', role: 0}

console.log(userApi.getByName("user2")) // User {username: 'user2', fullname: 'user2', role: 0}

userApi.remove("user2")
console.log(userApi.getByName("user2")) // undefined

try {
  userApi.remove("admin") // Error: User with name admin not found.
} catch {
  console.log("Error: User with name admin not found.")
}

/* 03_mediator */
console.log("/*---------------- 03_mediator ----------------*/")
const room = new WorkerRoom()

const worker1 = new NotificationWorker(room, 1)
const worker2 = new NotificationWorker(room, 2)
const worker3 = new NotificationWorker(room, 3)

room.add(worker1)
room.add(worker2)
room.add(worker3)

worker1.send("Hello dudes!")
// Message "Hello dudes!" sent by worker 1"
// Message "Hello dudes!" received by worker 2"
// Message "Hello dudes!" received by worker 3"

worker2.send("Hi friend!")
// Message "Hi friend!" sent by worker 2"
// Message "Hi friend!" received by worker 1"
// Message "Hi friend!" received by worker 3"
