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
