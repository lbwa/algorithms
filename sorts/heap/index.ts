import { lessThan, exchange } from 'shared/utils'

/**
 * heap sort
 * We insert all the keys to be sorted into a minimum-oriented priority queue,
 * then repeatedly use remove the minimum to remove them all in order. When
 * using a heap for the priority queue, we obtain heap-sort.
 * 我们将所有要排序的 key 值加入到一个最小堆优先队列中，然后不断重复地
 * @key 我们可以认为堆排序是一种优化过的选择排序，在此选择排序中不再通过迭代得到剩余
 * 值中的最小值，而是通过不断移除最小堆的根节点得到最小值来实现特殊的选择排序。
 * @phase 1. heep construction 2. sort down
 * @see https://algs4.cs.princeton.edu/24pq/
 * @see https://en.wikipedia.org/wiki/Heapsort
 * @notice 在以数组表示的二叉堆中，为了计算方便在第 0 位始终为 null 值
 */
export class HeapSort<E> {
  constructor(private list: Heap<E>) {
    this.sort(this.list)
  }

  sort(list: Heap<E>) {
    let rightPointer = list.length - 1

    /**
     * @phase  heapify 堆构造阶段
     * @target 目标是实现现有数组表示的非完全二叉树，借助下沉操作实现堆有序，即组成
     * 合格的二叉堆，即完全二叉树，即所有节点都大于其所有子节点（如有），且最后一排
     * 节点靠左排列，其中不限制左右子节点的大小顺序。
     *
     * 在二叉堆的数组表现形式中，索引为 k 的节点的父节点索引为 k >> 1（除 2 向下取
     * 整），k 的子节点为 2k 和 2k+1
     * @see https://algs4.cs.princeton.edu/24pq/
     * @see data-structures/priority-queue/index.ts
     *
     * 忽略所有的大小为 1 的子堆，且因为在二叉堆（即完全二叉树）中，最后一层节点始终靠
     * 左排列，即从最后一个节点的父节点索引为 lastIndex >> 1 的节点开始堆构造阶段，以
     * 下迭代借助下沉所有大小非 1 的节点使得整个原始的不完全二叉树成为完全二叉树，即
     * 构成二叉堆
     */
    for (let i = rightPointer >> 1; i >= 1; i--) {
      this.sink(this.list, i, rightPointer)
    }

    /**
     * @phase sort down
     * 通过不断 “移除” 根节点的方式，来实现将各个节点下沉至合适的位置实现排序
     * 本质上是选择排序的核心思路体现，不同之处在于通过二叉堆的下沉来实现选取极值
     */
    while (rightPointer > 1) {
      /**
       * 因为在（最小和最大）二叉堆中，其根节点始终是极值（最小或最大值），那么借助此
       * 特性，并借助删除二叉堆的根节点的思路实现 "选择" 剩余节点的极值的思路可实现一
       * 种特殊的选择排序。
       *
       * 一种移除二叉堆根节点的方式是将根节点与最后元素交换，然后下层交换后的根节点（
       * 即原来的最后一个节点）至合适位置，最终实现排序
       * @see https://algs4.cs.princeton.edu/24pq/
       * @see 本项目 data-structures/priority-queue/index.ts
       *
       * 注意，这里并没真的删除根节点，只是借助删除二叉堆根节点的思路实现选取剩下元素
       * 中的极值来实现一种特殊的选择排序，即堆排序的排序阶段
       */
      exchange(list, 1, rightPointer--)
      this.sink(list, 1, rightPointer)
    }
  }

  sink(list: Heap<E>, index: number, maxIndex: number) {
    // 仅在存在子节点时进行下沉操作
    while (2 * index <= maxIndex) {
      let child = 2 * index // 索引为 index 的左子节点对应的索引
      if (child < maxIndex && lessThan(list[child], list[child + 1])) {
        // 右边子节点更大时，选择右边更大的子节点，因为我们要尽可能的让所有大节点上
        // 浮，而小节点下沉
        child++
      }
      // 当当前节点不再小于其子节点的大项（即大于其所有子节点）时，退出迭代
      if (!lessThan(list[index], list[child])) break
      exchange(list, index, child)
      index = child
    }
  }
}
