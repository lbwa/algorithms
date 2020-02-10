import { isDef } from '../../shared/utils'

type LinkedListNode<E> = {
  value: E
  next: LinkedListNode<E> | null
}

function createNode<E>(value: E, next: LinkedListNode<E> | null = null) {
  return {
    value,
    next
  }
}

export class LinkedList<E> {
  head: LinkedListNode<E> | null = null
  tail: LinkedListNode<E> | null = null
  isEqual: (a: E, b: E) => boolean

  constructor(element?: E, isEqual = (a: E, b: E) => a === b) {
    if (isDef(element)) {
      this.head = this.tail = createNode(element)
    }
    this.isEqual = isEqual
  }

  append(element: E) {
    const node = createNode(element)

    if (!isDef(this.head) || !isDef(this.tail)) {
      // optional step: It also can be return directly without this.head/tail assignment
      this.head = this.tail = node
      return this
    }

    // will assign `this.tail.next` first
    this.tail = this.tail.next = node
    return this
  }

  prepend(element: E) {
    const head = createNode(element)

    if (!isDef(this.head) || !isDef(this.tail)) {
      // optional step: It also can be return directly without this.head/tail assignment
      this.head = this.tail = head
      return this
    }

    head.next = this.head
    this.head = head
    return this
  }

  delete(element: E) {
    // handle empty linked list
    if (!isDef(this.head) || !isDef(this.tail)) {
      return null
    }

    let deleteNode = null

    // release head reference if target is equal to head value
    if (this.isEqual(this.head.value, element)) {
      // handle single element linked list
      if (this.head === this.tail) {
        this.tail = null
      }
      deleteNode = this.head.value
      this.head = this.head.next // null
      return deleteNode
    }

    // start from 2nd element
    let current: LinkedListNode<E> | null = this.head
    while (current && current.next) {
      if (this.isEqual(current.next.value, element)) {
        deleteNode = current.next.value
        current.next = current.next.next
        break
      }
      // jump to next node
      current = current.next
    }

    // set tail element if target is equal to tail value
    if (this.isEqual(this.tail.value, element)) {
      this.tail = current
    }

    return deleteNode
  }
}
