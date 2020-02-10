/**
 * @description 每次排序之后，重置 iteration 标识，并执行新一轮的相邻元素比较
 * @param list
 * @param comparator
 * @wiki https://en.wikipedia.org/wiki/Bubble_sort
 */
export function bubbleSort<I>(
  list: I[],
  comparator: (a: I, b: I) => boolean
): I[] {
  let swapped = true
  while (swapped) {
    swapped = false
    for (let i = 0; i < list.length; i++) {
      if (comparator(list[i], list[i + 1])) {
        const temp = list[i]
        list[i] = list[i + 1]
        list[i + 1] = temp
        // Reset `iteration` tag when element of array swapping is occurred.
        swapped = true
      }
    }
  }

  return list
}

export function defaultComparator(a: number, b: number) {
  return a > b
}
