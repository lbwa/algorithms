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

  it('append a element into a linked list', () => {
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
})
