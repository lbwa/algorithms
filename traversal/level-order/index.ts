import { BinaryTreeNode } from 'data-structures/src/binary_tree'

export function levelOrderTraversal<V>(node: BinaryTreeNode<V> | null) {
  // queue 队列保存了二叉树的第 Sn 层的 n 个节点
  const queue: BinaryTreeNode<V>[] = []
  // 结果数组中，第 n 个索引对应了二叉树的第 Sn 层的遍历结果
  const answer: V[][] = []

  if (node === null) return answer

  queue.push(node)

  while (queue.length) {
    // 为当前第 Sn 层遍历预先分配结果空间
    answer.push([])

    // 固定当前层的节点树大小，因为会在 for 循环中不断向 queue 中加入新的节点
    const levelSize = queue.length
    // 与前中后序遍历不同的是，层次遍历每次取第 Sn 层中的 n 个节点进行遍历
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!
      answer[answer.length - 1]?.push(current.value)

      // 若存在第 Sn + 1 层的节点，那么按照左右子节点的顺序加入到 queue 队列中，用于
      // 在第 Sn + 1 层遍历
      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }
    // 当一次 while 循环结束时，queue 存在的节点，即是下一层的所有节点元素
  }

  return answer
}
