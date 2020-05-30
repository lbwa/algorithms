import { SymbolTable } from 'data-structures/symbol-table'

/**
 * 基于有序数组的二分查找
 * @see https://algs4.cs.princeton.edu/31elementary/
 *
 * 本实现基于一对平行数组，一个存储键，一个存储值。在保证数组中的键有序的前提下，然后
 * 使用数组的索引来高效的实现 get() 和其他操作
 */
export class BinarySearch<K, V> extends SymbolTable<K, V> {
  size = 0

  private keys: K[] = []
  private values: V[] = []

  constructor(private comparator: Comparable<K>) {
    super()
  }

  get isEmpty() {
    return this.size === 0
  }

  get min() {
    const head = this.keys[0]
    const tail = this.keys[this.size - 1]
    if (this.comparator(head, tail) < 0) {
      return head
    } else {
      return tail
    }
  }

  get max() {
    const head = this.keys[0]
    const tail = this.keys[this.size - 1]
    if (this.comparator(head, tail) < 0) {
      return tail
    } else {
      return head
    }
  }

  get(key: K) {
    if (this.isEmpty) return null
    const index = this.rank(key, 0, this.size - 1)
    if (index < this.size && this.comparator(key, this.keys[index]) === 0) {
      return this.values[index]
    } else {
      return null
    }
  }

  put(key: K, value: V) {
    const index = this.rank(key, 0, this.size - 1)
    // 命中所选 key，那么更新该值
    if (index < this.size && this.comparator(key, this.keys[index]) === 0) {
      this.values[index] = value
      return
    }
    /**
     * 未命中所选 key 值，那么对索引大于 index 的 keys 和 values 中的部分数据进行偏
     * 移，以用于插入新的数据
     */
    for (let j = this.size; j > index; j--) {
      this.keys[j] = this.keys[j - 1]
      this.values[j] = this.values[j - 1]
    }
    // 在 index 索引位置插入新的数据
    this.keys[index] = key
    this.values[index] = value
    this.size++
  }

  /**
   * @core 二分查找的核心方法
   * @details 通过基于递归的对半切分方案实现找到对应的 key，或直到左右指针碰撞
   */
  private rank(key: K, low: number, high: number): number {
    if (high < low) return low
    // low + (high - low) 等价于 low + high，此举为了防止大数相加导致溢出
    const mid = low + ((high - low) >> 1)
    const compare = this.comparator(key, this.keys[mid])
    if (compare < 0) {
      return this.rank(key, low, mid - 1)
    } else if (compare > 0) {
      return this.rank(key, mid + 1, high)
    } else {
      return mid
    }
  }

  /**
   * @core 二分查找的核心方法
   * @details 通过基于迭代的对半切分方案实现找到对应的 key，或直到左右指针碰撞
   */
  // private rank(key: K) {
  //   let low = 0
  //   let high = this.size - 1
  //   while (low <= high) {
  //     // low + (high - low) 等价于 low + high，此举为了防止大数相加导致溢出
  //     const mid = low + ((high - low) >> 1)
  //     const compare = this.comparator(key, this.keys[mid])
  //     if (compare < 0) {
  //       high = mid - 1
  //     } else if (compare > 0) {
  //       low = mid + 1
  //     } else {
  //       return mid
  //     }
  //   }
  //   return low
  // }
}
