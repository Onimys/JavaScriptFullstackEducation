/*
 * Заместитель — это объект, который выступает прослойкой между клиентом и реальным сервисным объектом.
 * Заместитель получает вызовы от клиента, выполняет свою функцию (контроль доступа, кеширование, изменение запроса и прочее),
 * а затем передаёт вызов сервисному объекту.
 *
 * Паттерн Заместитель применяется в TypeScript коде тогда, когда надо заменить настоящий объект его суррогатом,
 * причём незаметно для клиентов настоящего объекта. Это позволит выполнить какие-то добавочные поведения до или после
 * основного поведения настоящего объекта.
 * */

export enum UserRole {
  User,
  Admin,
}

export class User {
  username: string
  fullname: string
  role: UserRole

  constructor(username: string, fullname: string, role: UserRole = UserRole.User) {
    this.username = username
    this.fullname = fullname
    this.role = role
  }
}

interface UserService {
  add(user: User): void
  getByName(username: string): User | undefined
  remove(username: string): void
}

export class DatabaseUserService implements UserService {
  private users: User[] = []

  add(user: User): void {
    this.users.push(user)
  }

  getByName(username: string): User | undefined {
    return this.users.find((u) => u.username === username)
  }

  remove(username: string): void {
    const user = this.getByName(username)

    if (!user) throw Error(`User with name ${username} not found.`)

    const index = this.users.indexOf(user)
    this.users.splice(index, 1)
  }
}

export class DatabaseUserPermission implements UserService {
  constructor(private api: DatabaseUserService) {}

  add(user: User): void {
    if (user.role === UserRole.Admin) {
      throw Error("Forbidden create admin user.")
    }

    this.api.add(user)
  }

  getByName(username: string): User | undefined {
    const user = this.api.getByName(username)
    if (user?.role !== UserRole.Admin) {
      return user
    }

    console.log("Try get admin user")
    return undefined
  }

  remove(username: string): void {
    this.api.remove(username)
  }
}
