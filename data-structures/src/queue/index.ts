interface Item {
  name: string
  [key: string]: any
}

/**
 * @structure Queue
 * @feature FIFO, first in first out
 * @wiki https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 * @usage
 * const queue = new Queue(10);
 * queue.enqueue({ name: 'hi' });
 * queue.dequeue();
 */
export default class Queue<I extends Item> {
  queue: I[]
  nameMap: Record<string | symbol | number, any>
  threshold: number
  constructor(threshold = 10) {
    this.queue = []
    this.nameMap = {}
    this.threshold = threshold
  }

  enqueue(item: I) {
    if (!this.nameMap[item.name]) {
      // exceed limit
      if (this.queue.length >= this.threshold) {
        this.dequeue()
      }
      // enqueue new one
      this.nameMap[item.name] = item
      this.queue.push(item)
    } else {
      // requeue exist one
      this.requeue(item)
    }
    return this
  }

  dequeue() {
    if (this.queue.length) {
      delete this.nameMap[this.queue.shift()!.name]
    }
    return this
  }

  private requeue(item: I) {
    const queue: I[] = []
    let last = null
    for (const queueItem of this.queue) {
      if (item.name !== queueItem.name) {
        queue.push(item)
      } else {
        last = queueItem
      }
    }
    last && queue.push(last)
    this.queue = queue
  }
}
