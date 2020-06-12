import { levelOrderTraversal } from '.'
import { BinaryTreeNode } from 'data-structures/binary-tree'

describe('Binary tree level-order traversal', () => {
  it('Should return a correct result list', () => {
    expect(levelOrderTraversal(null)).toEqual([])

    expect(
      levelOrderTraversal(
        new BinaryTreeNode(
          3,
          new BinaryTreeNode(9),
          new BinaryTreeNode(20, new BinaryTreeNode(15), new BinaryTreeNode(7))
        )
      )
    ).toEqual([[3], [9, 20], [15, 7]])
  })
})
