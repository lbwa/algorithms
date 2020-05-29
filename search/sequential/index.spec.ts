import { LinkedListNode, SequentialSearch } from './index'

function createLinkedList(max: number): LinkedListNode<number, number> | null {
  if (max === 0) return null
  return new LinkedListNode(max, max, createLinkedList(--max))
}

describe('Sequential search 顺序查找', () => {
  let linkedListHead: LinkedListNode<number, number>
  const max = 10

  beforeEach(() => {
    linkedListHead = createLinkedList(max) as LinkedListNode<number, number>
  })

  it('Should return a correct size', () => {
    const search = new SequentialSearch(linkedListHead)
    expect(search.size).toBe(10)
    expect(search.isEmpty).toBeFalsy()
  })

  it('Should return a non-nullable value', () => {
    const search = new SequentialSearch(linkedListHead)
    let current: LinkedListNode<number, number> | null = linkedListHead
    let i = max
    while (current) {
      expect(search.get(current.key)).toBe(i)
      i--
      current = current.next
    }
  })

  it('Should return a null value', () => {
    const search = new SequentialSearch(linkedListHead)
    expect(search.get(11)).toBeNull()
  })

  it('Should update a node', () => {
    const search = new SequentialSearch(linkedListHead)
    search.put(8, 2)
    expect(search.get(8)).toBe(2)
    search.put(0, 3)
    expect(search.get(0)).toBe(3)
    search.put(5, null)
    expect(search.get(5)).toBeNull()
  })

  it('Should add new head node', () => {
    const search = new SequentialSearch(linkedListHead)
    search.put(11, 11)
    const newLinkedListHead = search.head
    expect(newLinkedListHead.key).toBe(11)
    expect(newLinkedListHead.value).toBe(11)
    expect(newLinkedListHead.next!.key).toBe(10)
    expect(newLinkedListHead.next!.value).toBe(10)
  })

  it('Should contains element', () => {
    const search = new SequentialSearch(linkedListHead)
    expect(search.contains(5)).toBeTruthy()
  })

  it('Should delete a element', () => {
    const search = new SequentialSearch(linkedListHead)
    search.delete(5)
    expect(search.contains(5)).toBeFalsy()
  })
})
