import { exchange } from 'shared/utils'

/**
 * 快速排序（原地排序）
 * @type 分治排序算法
 * @see https://en.wikipedia.org/wiki/Quicksort
 * @see https://algs4.cs.princeton.edu/23quicksort/
 */
export class QuickSort<E> {
  constructor(private list: E[], private comparator: Comparator<E>) {
    this.sort(this.list, 0, this.list.length - 1)
  }

  /**
   * 快速排序本质上是分治排序算法，始终将待排序数组分成两个子数组进行各自原地排序。当
   * 两个子数组各自排序，即表示原始数组得到排序。
   * 快速排序的性能核心在于 **切分** 方案，切分的位置取决于数组的内容
   */
  private sort(list: E[], low: number, high: number) {
    if (high <= low) return
    const j = this.partition(list, low, high)
    this.sort(list, low, j - 1) // 使得 a[low ~ j - 1] 项都不大于 a[j]
    this.sort(list, j + 1, high) // 使得 a[j + 1 ~ high] 项都不小于 a[j]
    return list
  }

  /**
   * 借助快慢指针实现分区内排序（以升序为例）
   * 1. 指定 a[high] 为切分元素，该元素最后被排序，不参与被递归的子数组排序
   * 2. 慢指针一定是小于切分元素，当快指针小于基准项时，交换快慢指针项。使得小项向前
   * 3. 该切分方案的核心在于始终将小项靠前，并通过不断递归子数组实现小项排序
   */
  private partition(list: E[], low: number, high: number) {
    const pivot = list[high]
    let i = low // i is slow pointer, j is fast pointer
    for (let j = low; j < high; j++) {
      if (this.comparator(list[j], pivot)) {
        exchange(list, i, j)
        i++
      }
    }
    // 切分元素 a[high] 不参与后续 sort 方法中递归子数组的排序，故交换至 i 项
    // 递归子数组排序时，仅有 a[0] ~ a[i-1] 和 a[i+1] ~ a[a.length - 1] 项排序
    exchange(list, i, high)
    // 返回当前切分元素索引
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
