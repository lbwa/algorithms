import { exchange } from '../shared/utils'

/**
 * insertion sort
 * 时间复杂度 О(n²)
 * 空间复杂度 О(n)，需要辅助空间O(1)
 * @see https://en.wikipedia.org/wiki/Insertion_sort
 * @see https://algs4.cs.princeton.edu/21elementary/
 */
export function insertionSort<E>(list: E[], comparator: Comparator<E>) {
  for (let i = 0; i < list.length; i++) {
    // 将 a[j] 项插入到之前排序的 a[0] ~ a[i] 项之间的合适位置
    for (let j = i; j > 0 && comparator(list[j - 1], list[j]); j--) {
      exchange(list, j, j - 1)
    }
  }
  return list
}
