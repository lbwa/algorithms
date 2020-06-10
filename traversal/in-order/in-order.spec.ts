import { inOrderTraversal } from './iteration'
import { BinaryTreeNode } from 'data-structures/binary-tree'

describe('In order traversal', () => {
  it('Should return a correct list', () => {
    expect(
      inOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4)
        )
      )
    ).toEqual([2, 1, 3, 0, 4])
  })
})
