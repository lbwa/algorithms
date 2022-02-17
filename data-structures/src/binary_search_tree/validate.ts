import { TreeNode } from '.'

/**
 * 以树的 value 字段为 number 类型为例，依据迭代版的树的中序遍历验证每个节点是否大于前
 * 一个节点，当满足以上条件时，
 * @leetcode https://leetcode-cn.com/problems/validate-binary-search-tree/
 */
export function isValidBinarySearchTree<K>(
  node: TreeNode<K, number> | null
): boolean {
  const stack: (TreeNode<K, number> | null)[] = []
  let prevValue: number = -Infinity
  let current: TreeNode<K, number> | null = node

  // 易错点：此处的判断条件为 或 而不是 与
  while (current || stack.length > 0) {
    // 根据中序遍历的定义，始终尽可能的遍历左子树，故压栈左子树的节点
    while (current) {
      stack.push(current)
      current = current.left
    }

    // 此时的出栈顺序即为中序遍历顺序
    current = stack.pop()!
    if (current.value <= prevValue) return false
    prevValue = current.value

    /**
     * 此语句需要结合最外层的 while 语句来理解，以 current 为最底层且最外层的左节点时
     * 那么 current.right 仍为 null，那么继续迭代时，至出栈时，得到父节点，即遍历父节
     * 继续执行至以下语句遍历父节点的子节点，即这是一个完整的子树（父节点）的中序遍历。
     */
    current = current.right
  }

  return true
}
