import Queue from '../index'

describe('Queue', () => {
  const maxQueueLength = 9
  const queue = new Queue(maxQueueLength)

  it('should create empty queue', () => {
    expect(queue.queue.length).toEqual(0)
  })

  it('Should enqueue and keep max length', () => {
    let counter = 100
    while (--counter >= 90) {
      queue.enqueue({ name: `${counter}` })
    }
    expect(queue.queue.length).toBe(maxQueueLength)
  })

  it('Should requeue when item exist, and keep max length', () => {
    queue.enqueue({ name: '96' })
    expect(queue.queue.length).toBe(maxQueueLength)
    expect(queue.queue[queue.queue.length - 1]).toEqual({ name: '96' })
  })
})
