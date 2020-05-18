/**
 * 选择排序
 * @type 原地排序
 * 通过不断的选择剩余元素的最小值实现排序
 * 最优时间复杂度： О(n²)
 * 最坏时间复杂度： О(n²)
 * 平均时间复杂度： О(n²)
 * 空间复杂度： 总共О(n)，需要辅助空间O(1)
 * @see https://algs4.cs.princeton.edu/21elementary/
 * @see https://en.wikipedia.org/wiki/Selection_sort
 */

import { exchange } from 'shared/utils'

export function selectionSort<E>(list: E[], comparator: Comparator<E>) {
  for (let i = 0; i < list.length; i++) {
    let min = i
    for (let j = i + 1; j < list.length; j++) {
      if (comparator(list[min], list[j])) {
        min = j
      }
    }
    exchange(list, i, min)
  }
  return list
}
