import { PriorityQueue } from './index'

describe('Priority Queue', () => {
  it('Should create a priority queue', () => {
    const queue = new PriorityQueue(10)
    expect(queue.isEmpty).toBeTruthy()
    expect(queue.size).toBe(0)
    expect(queue.hightest).toBeUndefined()
  })
})
