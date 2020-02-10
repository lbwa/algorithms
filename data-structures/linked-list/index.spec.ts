import { LinkedList } from './index'

describe('Singly linked list', () => {
  it('init a linked list without parameters', () => {
    const list = new LinkedList({})
    ;[list.head, list.tail, list.append].forEach(item =>
      expect(item).toBeDefined()
    )
  })

  it('init a linked list with parameters', () => {
    const items = [{ index: 1 }, 2]
    const list = new LinkedList(items[0])
    expect(list.head!.value).toEqual(items[0])
    expect(list.head).toEqual(list.tail)
  })

  it('append a element into a empty linked list', () => {
    const item = { name: 'item' }
    const list = new LinkedList<typeof item>()
    list.append(item)
    expect(list.head!.value).toEqual(item)
    expect(list.head).toEqual(list.tail)
  })

  it('append a element', () => {
    const items = [{ index: 1 }, 2, { name: 3 }]
    const list = new LinkedList(items[0])
    list.append(items[1])
    expect(list.head!.next!.value).toEqual(items[1])
    expect(list.tail!.value).toEqual(items[1])

    list.append(items[2])
    let current = list.head!
    // until the last element in the linked list
    while (current.next) {
      current = current.next
    }
    expect(current.value).toEqual(items[2])
  })

  it('prepend a element into a empty linked list', () => {
    const item = { name: 'item' }
    const list = new LinkedList<typeof item>()
    list.prepend(item)
    expect(list.head!.value).toEqual(item)
    expect(list.head).toEqual(list.tail)
  })

  it('prepend a element', () => {
    const items = [{ index: 1 }, 2, [3]]
    const list = new LinkedList(items[0])

    list.prepend(items[1])
    expect(list.head!.value).toEqual(items[1])
    expect(list.tail!.value).toEqual(items[0])
    list.prepend(items[2])
    expect(list.head!.value).toEqual(items[2])
  })

  it('delete a element from a empty linked list', () => {
    const list = new LinkedList()
    expect(list.delete({ index: 1 })).toBeNull()
    expect(list.head).toBeNull()
    expect(list.tail).toBeNull()
  })

  it('delete the only one element', () => {
    const list = new LinkedList(1)
    expect(list.delete(1)).toEqual(1)
    expect(list.head).toBeNull()
    expect(list.tail).toBeNull()
  })

  it('delete a head element', () => {
    const items = [{ index: 1 }, 2, [3]]
    const list = new LinkedList(items[0])
    list.append(items[1])
    list.append(items[2])
    expect(list.delete(items[0])).toEqual(items[0])
    expect(list.head!.value).toEqual(items[1])
  })

  it('delete a tail element', () => {
    const items = [{ index: 1 }, 2, [3]]
    const list = new LinkedList(items[0])
    list.append(items[1])
    list.append(items[2])
    expect(list.delete(items[2])).toEqual(items[2])
    expect(list.tail!.value).toEqual(items[1])
  })

  it('delete a normal element', () => {
    const items = [{ index: 1 }, 2, [3]]
    const list = new LinkedList(items[0])
    list.append(items[1])
    list.append(items[2])
    expect(list.head!.next!.next!.value).toEqual(list.tail!.value)
    expect(list.delete(items[1])).toEqual(items[1])
    expect(list.head!.next!.value).toEqual(list.tail!.value)
  })
})
