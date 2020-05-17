import { exchange } from 'sorts/shared/utils'

/**
 * 快速排序（原地排序）
 * @see https://en.wikipedia.org/wiki/Quicksort
 * @see https://algs4.cs.princeton.edu/23quicksort/
 */
export class QuickSort<E> {
  constructor(private list: E[], private comparator: Comparator<E>) {
    this.sort(this.list, 0, this.list.length - 1)
  }

  private sort(list: E[], low: number, high: number) {
    if (high <= low) return
    const j = this.partition(list, low, high)
    this.sort(list, low, j - 1) // 使得 a[low ~ j - 1] 项都不大于 a[j]
    this.sort(list, j + 1, high) // 使得 a[j + 1 ~ high] 项都不小于 a[j]
    return list
  }

  private partition(list: E[], low: number, high: number) {
    const pivot = list[high]
    // 借助双指针中快慢指针，实现分区排序
    let i = low // i is slow pointer, j is fast pointer
    for (let j = low; j < high; j++) {
      if (this.comparator(list[j], pivot)) {
        exchange(list, i, j)
        i++
      }
    }
    exchange(list, i, high)
    return i
  }
}

/**
 * 快速排序的 “非就地排序” 版本
 */
export function quickSortNotInPlace<E>(
  list: E[],
  comparator: (a: E, b: E) => boolean
): E[] {
  // 递归终止条件
  if (list.length < 2) return list

  // 选取第 i（此处为 0）项为 “分区项 partition item”
  const [pivot, ...subList] = list
  const subLeft = []
  const subRight = []

  for (const item of subList) {
    if (comparator(item, pivot)) {
      subLeft.push(item)
    } else {
      subRight.push(item)
    }
  }

  return quickSortNotInPlace(subLeft, comparator).concat(
    pivot,
    quickSortNotInPlace(subRight, comparator)
  )
}

/**
 * 快速排序的 “非就地排序” 版本
 */
export class QuickSortNotInPlace<E> {
  private pivot: E = this.list[0]
  private partitionIndex = 0
  private subList: E[] = []
  private subLeft: E[] = []
  private subRight: E[] = []

  constructor(public list: E[], private comparator: (a: E, b: E) => boolean) {}

  /**
   * 选取第 i 项作为分区项 partition item
   */
  partition(index = this.partitionIndex) {
    this.partitionIndex = index
    this.pivot = this.list[index]
    this.subList = this.list.filter((_, i) => i !== index)
    return this
  }

  sort(): E[] {
    // 尾递归终止条件
    if (this.list.length < 2) return this.list

    for (const item of this.subList) {
      if (this.comparator(item, this.pivot)) {
        this.subLeft.push(item)
      } else {
        this.subRight.push(item)
      }
    }

    return new QuickSortNotInPlace(this.subLeft, this.comparator)
      .partition(this.partitionIndex)
      .sort()
      .concat(
        this.pivot,
        new QuickSortNotInPlace(this.subRight, this.comparator)
          .partition(this.partitionIndex)
          .sort()
      )
  }
}
