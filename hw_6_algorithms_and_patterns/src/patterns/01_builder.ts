/*
 * Строитель — это порождающий паттерн проектирования, который позволяет создавать объекты пошагово.
 *
 * Паттерн можно часто встретить в TypeScript-коде, особенно там, где требуется пошаговое создание продуктов или конфигурация сложных объектов.
 * */

export interface DbSettings {
  host: string
  port: number

  db: string
  schema?: string

  username: string
  password: string

  params: { key: string; value: string }[]
}

export class Builder<T> {
  constructor(private current: {} = {}) {}

  set<K extends keyof T, V extends T[K]>(key: K, value: V): Builder<T> {
    return new Builder<T>({ ...this.current, ...{ [key]: value } })
  }

  build(): T {
    return <T>this.current
  }
}
