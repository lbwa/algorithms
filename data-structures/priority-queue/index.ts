/**
 * 二叉树：一个通过指针（引用）实现的连接各个节点的树性结构，在二叉树中，每个节点至多有
 * 两个子节点
 * @see https://en.wikipedia.org/wiki/Binary_tree
 *
 * 堆：一种基于树性结构的抽象数据结构，常见实现有基于二叉树实现的二叉堆。二叉堆常简称堆
 * @see https://en.wikipedia.org/wiki/Heap_(data_structure)
 *
 * 二叉堆实现：
 * 1. 链表实现的二叉堆插入为 O(1)，但查找为 O(n)
 * 2. 数组实现的二叉堆无需使用指针（或引用）即可通过索引实现沿树上下移动。数组实现可以
 * 实现对数节别的插入元素和删除极值元素的操作。具有 O(log n) 时间复杂度的插入元素性
 * 能，O(n) 的初始化构造的时间复杂度。如果使用自平衡二叉查找树，插入与删除的时间复杂度
 * 为O(log n)，构造二叉树的时间复杂度为O(n log n)。
 *
 * 二叉堆特点：
 * 0. 有链表和数组多种实现
 * 1. 二叉堆是一组能够用堆有序的完全二叉树排序的元素，并出于性能原因在 **数组** 中按照
 * 层级存储（不使用数组的第一个位置），即索引 0 始终为空，一个大小为 n 的堆将存储
 * 在 1 ~ n 索引中。
 * 2. 当一棵二叉树的每个节点都大于等于他的两个子节点时，他被称为 `堆有序`。
 * 3. 一棵大小为 n 的完全二叉树的高度为 log n
 * 4. 在一个二叉堆中，位置 k 的节点的父节点的位置为 k >> 1（除 2 向下取整），而它的两
 * 个子节点的位置分别为 2k 和 2k + 1
 */

/**
 * 在优先级队列中，高优先级的节点始终在低优先级节点之前。因为 `二叉堆`（简称 `堆`）结构
 * 的根节点始终是数据集合中的极值，那么使用 `二叉堆` 实现优先级队列
 * @see https://algs4.cs.princeton.edu/24pq/
 * @see https://en.wikipedia.org/wiki/Priority_queue
 */
export class PriorityQueue<E> {
  /**
   * 完全二叉树只用数组而不需要指针就可表示，将二叉树的几点
   */
  private heap: [null, ...E[]] = [null]

  constructor(private capacity: number) {}

  /**
   * 当前优先级队列是否为空队列
   */
  get isEmpty() {
    return this.size <= 0
  }

  /**
   * 当前优先级队列中的最高优先级项
   */
  get hightest() {
    return this.heap[1] // 返回二叉堆根节点
  }

  /**
   * 当前优先级队列的大小
   */
  get size() {
    return this.heap.length - 1
  }

  /**
   * 插入一项到当前优先级队列中
   */
  insert(el: E) {}

  /**
   * 删除并返回当前优先级队列中的最高优先级项
   */
  deleteHightest() {}
}
