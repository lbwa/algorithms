import { PriorityQueue } from './index'
import { isDef } from 'shared/utils'

// 在一个用数组表示的二叉堆中，第 k 项的父节点为 k/2（向下取整），子节点为 2k 和 2k+1
function verifyHeap(heap: unknown[]) {
  return heap.every((el, index) => {
    if (index > 0 && isDef(heap[2 * index])) {
      return (el as number) > (heap[2 * index] as number)
    }
    if (index > 0 && isDef(heap[2 * index + 1])) {
      return (el as number) > (heap[2 * index + 1] as number)
    }

    return true
  })
}

describe('Priority Queue', () => {
  let queue: PriorityQueue<number>
  beforeEach(() => {
    queue = new PriorityQueue()
  })

  it('Should create a priority queue', () => {
    expect(queue).toBeDefined()
    expect(queue.isEmpty).toBeTruthy()
    expect(queue.size).toBe(0)
    expect(queue.hightest).toBeUndefined()
  })

  it('Should insert a element', () => {
    queue.insert(10)
    expect(queue.isEmpty).toBeFalsy()
    expect(queue.size).toBe(1)
    expect(queue.hightest).toBe(10)
  })

  it('Should insert multiple element.', () => {
    ;[10, 12, 4, 2, 5, 3].forEach((el) => queue.insert(el))
    expect(queue.size).toBe(6)
    expect(queue.hightest).toBe(12)
    // every node should be greater than its all child nodes.
    expect(verifyHeap(queue.heap)).toBeTruthy()
  })

  it('Should delete root node', () => {
    expect(queue.size).toBe(0)
    expect(queue.deleteHightest()).toBeUndefined()
    ;[5, 2, 4, 1, 7, 6, 3, 8].forEach((el) => queue.insert(el))
    expect(queue.deleteHightest()).toBe(8)
    expect(verifyHeap(queue.heap)).toBeTruthy()
    expect(queue.size).toBe(7)
    expect(queue.hightest).toBe(7)
  })
})
