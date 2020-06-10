import { inOrderTraversal as iterativeInOrderTraversal } from './iteration'
import { inOrderTraversal as recursiveInOrderTraversal } from './recursion'
import { BinaryTreeNode } from 'data-structures/binary-tree'

describe('In order traversal', () => {
  it('Should return a correct list with iterative traversal', () => {
    expect(
      iterativeInOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([2, 1, 3, 0, 5, 4, 6])
  })

  it('Should return a correct list with recursive traversal', () => {
    expect(
      recursiveInOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([2, 1, 3, 0, 5, 4, 6])
  })
})
