import { BinaryTreeNode } from 'data-structures/binary-tree'

export function inOrderTraversal<V>(node: BinaryTreeNode<V> | null): V[] {
  const answer: V[] = []
  traversal(node, answer)
  return answer
}

function traversal<V>(node: BinaryTreeNode<V> | null, answer: V[]) {
  if (node === null) return

  traversal(node.left, answer)
  answer.push(node.value)
  traversal(node.right, answer)
}
