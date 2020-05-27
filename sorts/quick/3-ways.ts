import { exchange } from 'shared/utils'

/**
 * 三路快速排序常用于列表中存在大量重复相等元素的情况，因为在三路切分中，每次切分，都有
 * 大量重复的相等元素将不参与后续的子列表排序，大大节省排序中的比较和排序时间
 * @see https://algs4.cs.princeton.edu/23quicksort/
 */
export class Quick3Ways<E> {
  constructor(private list: E[], private comparator: (a: E, b: E) => number) {
    this.sort(this.list, 0, this.list.length - 1)
  }

  private sort(list: E[], low: number, high: number) {
    if (low >= high) return
    const pivot = list[low]
    const { comparator } = this
    let lt = low
    let i = low + 1
    let gt = high

    // 经过迭代循环后，low ~ lt 全都大于或全小于 pivot 项，gt ~ high 反之；
    // lt ~ gt 所有项均等于 pivot
    while (i <= gt) {
      const compare = comparator(list[i], pivot)
      if (compare < 0) {
        exchange(list, lt++, i++)
      } else if (compare > 0) {
        exchange(list, i, gt--)
      } else {
        i++
      }
    }
    // list[lo ~ lt - 1] < pivot = list[lt ~ gt] < list[gt + 1 ~ hi]
    this.sort(list, low, lt - 1)
    this.sort(list, gt + 1, high)
  }
}
