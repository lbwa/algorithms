/**
 * @structure Queue
 * @feature FIFO, first in first out
 * @wiki https://en.wikipedia.org/wiki/Queue_(abstract_data_type)
 * @usage
 * const queue = new Queue(10)
 * queue.enqueue({ name: 'hi' })
 * queue.dequeue()
 */

interface Item {
  name: string
  [key: string]: any
}

export default class Queue {
  queue: Item[]
  nameMap: { [key: string]: Item }
  maxLen: number
  constructor(maxLen = 10) {
    this.queue = []
    this.nameMap = {}
    this.maxLen = maxLen
  }

  enqueue(item: Item) {
    if (!this.nameMap[item.name]) {
      // exceed limit
      if (this.queue.length >= this.maxLen) {
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
      delete this.nameMap[(this.queue.shift() as Item).name]
    }
    return this
  }

  private requeue(item: Item) {
    const queue: Item[] = []
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
