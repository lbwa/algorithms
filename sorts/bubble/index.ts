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
    // 因为我们始终是从首项开始顺序迭代，那么若此时顺序迭代完整个列表，且没有发生交换，
    // 那么此时的 swapped 变量为 false，即表示经历了从首项到末项的每相邻的两项都
    // 满足 comparator(a, b) 函数，即表示完成了整个列表的排序，此时将跳出 while 循环
  }

  return list
}

export function optimizedBubbleSort<E>(
  list: E[],
  comparator: (a: E, b: E) => boolean
) {
  let len = list.length

  let swapped = true
  while (swapped) {
    swapped = false

    for (let i = 0; i < len; i++) {
      if (comparator(list[i], list[i + 1])) {
        const temp = list[i]
        list[i] = list[i + 1]
        list[i + 1] = temp
        swapped = true
      }
    }

    // 因为我们每次都排序的一项为当次迭代循环中的极值项，那么我们在下一次顺序迭代中
    // 可以忽略排序过的项，即下一轮迭代仅顺序迭代 len - 1 项，而不再是整个列表
    len--
  }

  return list
}
