import { exchange } from '../shared/utils'

/**
 * 希尔排序
 * @type 原地比较排序，本质上是对插入排序的优化，即不再比较相邻元素进行插入，而是通过较大步长实现插入
 * - 时间复杂度 O(nlog2n)
 * - 空间复杂度	O(n), O(1) 辅助
 * @see https://en.wikipedia.org/wiki/Shellsort
 * @see https://algs4.cs.princeton.edu/21elementary/
 */
export function shellSort<E>(list: E[], comparator: Comparator<E>) {
  let len = list.length
  let h = 1
  // 确定一个最大步长
  while (h < len / 3) {
    /**
     * 选择一个递增序列，该递增序列直接影响希尔排序的性能
     * 1. 希尔排序的优势在于，相对于插入排序和选择排序的相邻比较，数组越大，希尔排序的
     * 优势越明显
     * 2. 对于其他复杂高效算法来说，希尔排序够简单，且性能也不差，在没有合适的复杂高效
     * 算法之时，使用希尔排序实现中等大小的数组是个不错的选择
     */
    h = 3 * h + 1 // 1, 4, 13, 40, 121, 364, 1093 ...
  }
  while (h >= 1) {
    for (let i = h; i < len; i++) {
      // 每次步进 h 步长进行插入，而不再是相邻比较
      for (let j = i; j >= h && comparator(list[j - h], list[j]); j -= h) {
        exchange(list, j, j - h)
      }
    }
    h = Math.floor(h / 3) // 逐步收敛步长，即逐步排序各个区间
  }
  return list
}
