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
   * 依据对撞指针实现快速排序中的切分策略
   */
  private partition(list: E[], low: number, high: number) {
    /**
     * 1. 使用随机项作为基准 pivot 项，不推荐使用两端项，因为当待排序列表接近于有序
     * 时，将大大增加操作数（时间复杂度上升）
     * 2. 一种随机方案是选取中间项作为基准项
     * 3. low + ((high - low) >> 1) 取中间项的好处在于规避直接 low + high 时出现溢
     * 出的场景
     * 4. 将基准项移动到任意一端，以规避在迭代过程中的特殊处理
     */
    exchange(list, low, low + ((high - low) >> 1))

    // 读取移动后的基准项
    const pivot = list[low]
    const { comparator } = this
    let i = low // left pointer
    let j = high + 1 // right pointer
    while (true) {
      // 从第 low + 1 项开始，直到第一个不满足 comparator 的 i 项
      while (comparator(list[++i], pivot)) if (i === high) break
      // 从第 high 项开始，直到第一个不满足 comparator 的 j 项
      while (comparator(pivot, list[--j])) if (j === low) break

      // 左右指针碰撞，即完成整个 low ~ high 段的排序，退出迭代
      if (i >= j) break

      // 交换不满足上述条件的 i, j 项，使得迭代继续，最终实现指针碰撞时，碰撞处左边全
      // 都大于或全都小于基准项，右侧反之。
      exchange(list, i, j)
    }

    // 将基准项与指针碰撞处交换，因为在快速排序策略中，基准项始终不参与后续子列表的分治
    // 排序
    exchange(list, low, j)
    return j
  }
}

export class QuickSortInPlace<E> {
  constructor(private list: E[], private comparator: Comparator<E>) {
    this.sort(this.list, 0, this.list.length - 1)
  }

  private sort(list: E[], low: number, high: number) {
    if (low >= high) return
    const index = this.partition(list, low, high)
    this.sort(list, low, index - 1)
    this.sort(list, index + 1, high)
  }

  /**
   * 借助快慢指针实现分区内排序（以升序为例）
   * 1. 指定 a[high] 为切分元素，该元素最后被排序，不参与被递归的子数组排序
   * 2. 慢指针一定是小于切分元素，当快指针小于基准项时，交换快慢指针项。使得小项向前
   * 3. 该切分方案的核心在于始终将小项靠前，并通过不断递归子数组实现小项排序
   */
  private partition(list: E[], low: number, high: number) {
    /**
     * 1. 使用随机项作为基准 pivot 项，不推荐使用两端项，因为当待排序列表接近于有序
     * 时，将大大增加操作数（时间复杂度上升）
     * 2. 一种随机方案是选取中间项作为基准项
     * 3. low + ((high - low) >> 1) 取中间项的好处在于规避直接 low + high 时出现溢
     * 出的场景
     * 4. 将基准项移动到任意一端，以规避在迭代过程中的特殊处理
     */
    exchange(list, high, low + ((high - low) >> 1))

    // 读取移动后的基准项
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
