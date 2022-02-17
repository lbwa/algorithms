import { BinaryTreeNode } from 'data-structures/src/binary_tree'

export function postOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  const answer: V[] = []
  traversal(node, answer)
  return answer
}

function traversal<V>(node: BinaryTreeNode<V> | null, answer: V[]) {
  if (node === null) return

  traversal(node.left, answer)
  traversal(node.right, answer)
  answer.push(node.value)
}
