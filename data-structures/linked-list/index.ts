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

  constructor(element?: E) {
    if (isDef(element)) {
      this.head = this.tail = createNode(element)
    }
  }

  append(element: E) {
    const node = createNode(element)
    if (!isDef(this.head) || !isDef(this.tail)) {
      this.head = this.tail = node
      return this
    }

    // will assign `this.tail.next` first
    this.tail = this.tail.next = node
    return this
  }
}
