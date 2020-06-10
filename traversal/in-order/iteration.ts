import { BinaryTreeNode } from 'data-structures/binary-tree'

/**
 * @leetcode https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode/
 */
export function inOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  const answer: V[] = []
  const stack: (BinaryTreeNode<V> | null)[] = []
  let current: BinaryTreeNode<V> | null = node

  while (current || stack.length) {
    // 依据中序遍历定义，左子树先压栈
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()!
    answer.push(current.value)
    // 该行需要结合 line 11 的 while 条件来看，当 current 为最底层的最左节点时，那么
    // current.right 仍为 null, 但继续迭代，至 18 行，出栈得到父节点，即遍历父节点，
    // 并继续选取父节点的右节点，若存在，就继续遍历右子树
    current = current.right
  }

  return answer
}
