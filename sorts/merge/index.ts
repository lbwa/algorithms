/**
 * 归并排序（原地归并，自顶向下归并）
 * @type 分治算法 divide and conquer algorithm，优势在于可保证将任意长度为 N 的数组
 * 排序所需时间和 NlogN 成正比，劣势在于需要的额外空间于 N 成正比
 * - 时间复杂度 O(n log n)
 * - 空间复杂度 О(n) total with O(n) auxiliary, O(1) auxiliary with linked lists[1]
 * @see https://en.wikipedia.org/wiki/Merge_sort
 * @see https://algs4.cs.princeton.edu/22mergesort/
 */
export class MergeSort<E> {
  // 辅助数组
  private aux: E[] = []

  constructor(private list: E[], private comparator: Comparator<E>) {
    // 原地排序，故不设返回值
    this.sort(this.list, 0, this.list.length - 1)
  }

  /**
   * 不断拆分为子部分排序，即为 `自顶向下` 的体现
   * 1. 要将 a[lo ~ hi] 进行排序，显降它们分为 a[lo ~ mid] 和 a[mid + 1 ~ hi] 两部分
   * 2. 分别通过递归调用将两个子部分进行排序
   * 3. 最后间更有序的子数组归并为最终结果
   */
  private sort(list: E[], low: number, high: number) {
    if (low >= high) return
    // 在给定范围 low ~ high 中得到中间索引，向下取整
    const mid = low + ((high - low) >> 1)
    // 排序左侧
    this.sort(list, low, mid)
    // 排序右侧
    this.sort(list, mid + 1, high)
    // 合并排序结果
    this.merge(list, low, mid, high)
  }

  private merge(list: E[], low: number, mid: number, high: number) {
    // 将 low ~ high 区间数组复制到 this.aux 辅助数组中
    for (let k = low; k <= high; k++) {
      this.aux[k] = list[k]
    }

    let i = low
    let j = mid + 1
    // 合并 low ~ high 区间回 list 数组
    for (let k = low; k <= high; k++) {
      // 因为在 sort 中 low 和 mid 与 high 和 mid 都在不断收敛，故有以下四种情况
      if (i > mid) {
        // 左侧用尽时，取右半边元素归并回 list 数组
        list[k] = this.aux[j++] // 先取索引 j 值，在得到 aux[j] 值后，j + 1
      } else if (j > high) {
        // 右边用尽时，取左半边元素归并回 list 数组
        list[k] = this.aux[i++]
      } else if (this.comparator(this.aux[i], this.aux[j])) {
        list[k] = this.aux[j++]
      } else {
        list[k] = this.aux[i++]
      }
    }
  }
}

export function mergeSort<E>(list: E[], comparator: Comparator<E>) {
  const aux: E[] = []

  // 分治法的体现，该函数仅用于排序原数组的指定范围 low(含) ~ high(含)之间的项
  function sort(list: E[], low: number, high: number) {
    if (low >= high) return
    let mid = low + ((high - low) >> 1)
    sort(list, low, mid)
    sort(list, mid + 1, high)
    merge(list, low, mid, high)
  }

  function merge(list: E[], low: number, mid: number, high: number) {
    for (let k = low; k <= high; k++) {
      aux[k] = list[k]
    }
    let i = low // 以 mid 为界，右边部分起始指针
    let j = mid + 1 // 以 mid 为界，左边部分起始指针
    for (let k = low; k <= high; k++) {
      if (i > mid) {
        list[k] = aux[j++]
      } else if (j > high) {
        list[k] = aux[i++]
      } else if (comparator(aux[i], aux[j])) {
        list[k] = aux[j++]
      } else {
        list[k] = aux[i++]
      }
    }
  }

  sort(list, 0, list.length - 1)

  return list
}
