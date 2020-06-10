import { BinaryTreeNode } from 'data-structures/binary-tree'

/**
 * @name 二叉树的前序遍历 pre-order traversal
 * @
 * @时间复杂度 访问每个节点恰好一次，即 O(N)
 * @空间复杂度 最坏的情况存储整棵树，即 O(N)
 * @leetcode https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 */
export function preOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  const answer: V[] = []
  const stack: BinaryTreeNode<V>[] = []

  if (node === null) return []

  stack.push(node)

  while (stack.length > 0) {
    const current = stack.pop()!
    answer.push(current.value)

    /**
     * 因为栈结构中，遵循 FILO 先进后出，那么以前序遍历的相反顺序压栈，以保证在出栈时
     * 为前序遍历的顺序
     */
    if (current.right) {
      stack.push(current.right)
    }
    if (current.left) {
      stack.push(current.left)
    }
  }

  return answer
}
