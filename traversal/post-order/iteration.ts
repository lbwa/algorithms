import { BinaryTreeNode } from 'data-structures/binary-tree'

/**
 * @时间复杂度 访问每个节点恰好一次，即 O(N)
 * @空间复杂度 取决于树的结构，最坏情况需要保存整棵树，即 O(N)
 * @leetcode https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/er-cha-shu-de-hou-xu-bian-li-by-leetcode/
 */
export function postOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  const stack: BinaryTreeNode<V>[] = []
  const answer: V[] = []

  if (node === null) {
    return answer
  }

  stack.push(node)

  while (stack.length > 0) {
    const current = stack.pop()!
    /**
     * @key 关键点，始终插入到第一项，那么在之前的前序遍历 traversal/pre-order 中
     * 排在首位的节点项，此时因为 unshift 操作，而变成了尾项，那么在反向入栈右左子节点
     * 那么在出栈时，即是后序遍历的顺序
     */
    answer.unshift(current.value) // 插入至数组首项

    /**
     * 与前序遍历的循环结构相似，总是以后序遍历的相反顺序插入子树
     */
    if (current.left) {
      stack.push(current.left)
    }

    if (current.right) {
      stack.push(current.right)
    }
  }

  return answer
}
