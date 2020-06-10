import { SymbolTable } from '../symbol-table'
import { isNull, isDef } from 'shared/utils'

export class TreeNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public size: number,
    public left: TreeNode<K, V> | null = null,
    public right: TreeNode<K, V> | null = null
  ) {}
}

/**
 * @name 二叉查找树
 * @definition A binary search tree (BST) is a binary tree where each node has
 * a Comparable key (and an associated value) and satisfies the restriction
 * that the key in any node is larger than the keys in all nodes in that node's
 * left subtree and smaller than the keys in all nodes in that node's right
 * subtree.
 * @features 二分查找始终基于一个有序的结构，在二叉查找树中是基于一个有序的二叉树。二
 * 叉查找树结合了链表插入的灵活性和有序数组查找的高效性
 * 1. 树由节点组成，节点包含的链接可未 null 或指向其他节点
 * 2. 每个节点至多只有一个父节点。且只有左右两个子链接（左右子节点，左右子二叉树）
 * 3. 左子节点始终为小于当前节点的节点树组成，右节点反之。（与二叉堆（优先对立）的显著
 * 区别，二叉堆不限制左右子节点的大小，且二叉堆中根节点为极值点）
 * 4. 键名始终具有唯一性，否则被新值覆盖
 * @see https://algs4.cs.princeton.edu/32bst/
 */
export class BinarySearchTree<K, V> extends SymbolTable<K, V> {
  constructor(
    private root: TreeNode<K, V> | null = null,
    private comparator: Comparable<K>
  ) {
    super()
  }

  get size() {
    return this.getNodeSize(this.root)
  }

  get isEmpty() {
    return this.size === 0
  }

  // 在二叉搜索树定义中，最左侧节点即为最小 key 节点（当以 value 排序时，即最小的
  // value 节点）
  get minKey() {
    if (isNull(this.root)) return null
    /**
     * 在本实现中，所有节点的顺序依照键的大小来实现，那么当节点的左子二叉树为空时，那
     * 么节点本身即为最小键
     */
    let current: TreeNode<K, V> | null = this.root
    while (isDef(current) && isDef(current.left)) {
      current = current.left
    }
    return current.key
  }

  // 在二叉搜索树中，最右侧侧节点记为最大 key 节点（当以 value 字段排序时，即为最大的
  // value 节点）
  get maxKey() {
    if (isNull(this.root)) return null

    let current: TreeNode<K, V> | null = this.root
    while (isDef(current) && isDef(current.right)) {
      current = current.right
    }
    return current.key
  }

  private getNodeSize(node: TreeNode<K, V> | null) {
    if (isNull(node)) return 0
    return node.size
  }

  private getFromNode(node: TreeNode<K, V> | null, key: K): V | null {
    if (isNull(node)) return null

    const compare = this.comparator(node.key, key)
    if (compare > 0) {
      return this.getFromNode(node.left, key)
    } else if (compare < 0) {
      return this.getFromNode(node.right, key)
    } else {
      return node.value
    }
  }

  private putFromNode(
    node: TreeNode<K, V> | null,
    key: K,
    value: V
  ): TreeNode<K, V> {
    if (isNull(node)) return new TreeNode(key, value, 1) // 未命中，则新建该节点

    const compare = this.comparator(node.key, key)
    if (compare > 0) {
      // 当前节点 key 大于指定 key，那么目标位置在较小值所在的左侧子树中
      node.left = this.putFromNode(node.left, key, value)
    } else if (compare < 0) {
      // 当前节点 key 小于指定 key，那么目标位置在较大值所在右侧子树中
      node.right = this.putFromNode(node.right, key, value)
    } else {
      // 命中，则更新该节点
      node.value = value
    }
    node.size = this.getNodeSize(node.left) + this.getNodeSize(node.right) + 1
    return node
  }

  private selectFromNode(
    node: TreeNode<K, V> | null,
    order: number
  ): TreeNode<K, V> | null {
    if (isNull(node)) return null

    const leftChildrenSize = this.getNodeSize(node.left)
    // 比左侧子节点的 size 小，表示要找的第 k 小的节点在左侧子二叉树中，故递归查找
    if (order < leftChildrenSize) return this.selectFromNode(node.left, order)
    // 比左侧子节点的 size 大，表示要找的第 k 小的几点在右侧子二叉树中，故递归
    // 查找第 order - leftChildrenSize - 1 小的节点即目标节点
    // 其中减 1 表示减去当前节点自身大小，即 1
    if (order > leftChildrenSize)
      return this.selectFromNode(node.right, order - leftChildrenSize - 1)

    return node
  }

  /**
   * 获取节点键名为 key 的节点值
   */
  get(key: K) {
    return this.getFromNode(this.root, key)
  }

  /**
   * 更新节点键名为 key 的节点值为 value，如果不存在 key 键名，那么新建 key 键名，并
   * 指定键值为 value
   */
  put(key: K, value: V) {
    return this.putFromNode(this.root, key, value)
  }

  /**
   * 选择第 K 小的键的节点
   * @further 第 k 大同理，且始于右子树而非左子树
   */
  select(order: number) {
    return this.selectFromNode(this.root, order)
  }
}
