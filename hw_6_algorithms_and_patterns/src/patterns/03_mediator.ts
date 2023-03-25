/*
 * Посредник — это поведенческий паттерн, который упрощает коммуникацию между компонентами системы.
 *
 * Паттерн в основном используется на Frontend, чтобы связать компоненты, которые разрознено должны знать о друг друге.
 */

interface Worker {
  getID(): number
  send(message: string): void
  receive(message: string): void
}

export class NotificationWorker implements Worker {
  constructor(private mediator: Mediator, private id: number) {}

  getID(): number {
    return this.id
  }

  send(message: string) {
    console.log(`Message "${message}" sent by worker ${this.id}"`)
    this.mediator.notify(this, message)
  }

  receive(message: string) {
    console.log(`Message "${message}" received by worker ${this.id}"`)
  }
}

interface Mediator {
  add(worker: Worker): void
  notify(sender: Worker, message: string): void
}

export class WorkerRoom implements Mediator {
  private workers: Worker[] = []
  add(worker: Worker): void {
    this.workers.push(worker)
  }

  notify(sender: Worker, message: string): void {
    this.workers.forEach((w) => {
      if (w.getID() != sender.getID()) {
        w.receive(message)
      }
    })
  }
}
