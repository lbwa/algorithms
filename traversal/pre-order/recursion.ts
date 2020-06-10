import { BinaryTreeNode } from 'data-structures/binary-tree'

/**
 * @leetcode https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 */
export function preOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  const answer: V[] = []
  traversal(node, answer)
  return answer
}

function traversal<V>(node: BinaryTreeNode<V> | null, answer: V[]) {
  if (node === null) return

  answer.push(node.value)
  traversal(node.left, answer)
  traversal(node.right, answer)
}
