import { SymbolTable } from 'data-structures/src/symbol-table'

export class LinkedListNode<K, V> {
  constructor(
    public key: K,
    public value: V | null,
    public next: LinkedListNode<K, V> | null
  ) {}
}

/**
 * 基于无序链表的顺序查找，本质上即为线性查找
 * @see https://algs4.cs.princeton.edu/31elementary/index.php#3.1
 */
export class SequentialSearch<K, V> extends SymbolTable<K, V> {
  constructor(public head: LinkedListNode<K, V>) {
    super()
  }

  get size() {
    let i = 0
    let current: LinkedListNode<K, V> | null = this.head
    while (current) {
      i++
      current = current.next
    }
    return i
  }

  get isEmpty() {
    return this.size === 0
  }

  get(key: K) {
    let current: LinkedListNode<K, V> | null = this.head
    while (current) {
      if (current.key === key) {
        return current.value // 命中
      }
      current = current.next // 未命中
    }

    return null
  }

  put(key: K, value: V | null) {
    let current: LinkedListNode<K, V> | null = this.head
    while (current) {
      if (current.key === key) {
        // 命中时，更新节点
        current.value = value
        return
      }
      current = current.next
    }

    // 未命中时，新建头节点
    this.head = new LinkedListNode(key, value, this.head)
  }
}
