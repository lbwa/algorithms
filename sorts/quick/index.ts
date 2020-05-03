/**
 * @description
 * @param list
 * @param comparator
 * @wiki https://en.wikipedia.org/wiki/Quicksort
 */

export function quickSort<E>(
  list: E[],
  comparator: (a: E, b: E) => boolean
): E[] {
  // 递归终止条件
  if (list.length < 2) return list

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

  return quickSort(subLeft, comparator).concat(
    pivot,
    quickSort(subRight, comparator)
  )
}

export class QuickSort<E> {
  private pivot: E = this.list[0]
  private subList: E[] = []
  private subLeft: E[] = []
  private subRight: E[] = []

  constructor(public list: E[], private comparator: (a: E, b: E) => boolean) {}

  partition(index: number = 0) {
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

    return new QuickSort(this.subLeft, this.comparator)
      .partition(0)
      .sort()
      .concat(
        this.pivot,
        new QuickSort(this.subRight, this.comparator).partition(0).sort()
      )
  }
}
