/**
 * @description 每次排序之后，重置 iteration 标识，并执行新一轮的相邻元素比较
 * @param list
 * @param comparator
 * @wiki https://en.wikipedia.org/wiki/Bubble_sort
 */
export function bubbleSort<E>(list: E[], comparator: (a: E, b: E) => boolean) {
  let swapped = true

  while (swapped) {
    swapped = false

    // 顺序迭代数组，一次完整 for 循环为一次顺序迭代
    // 每次顺序迭代，都存在一个最大/小项下沉到末尾
    for (let i = 0; i < list.length; i++) {
      if (comparator(list[i], list[i + 1])) {
        const temp = list[i]
        list[i] = list[i + 1]
        list[i + 1] = temp

        swapped = true
      }
    }
    // 若此时没有发生交换，那么此时的 swapped 变量为 false，即表示所有的项已经排序
  }

  return list
}
