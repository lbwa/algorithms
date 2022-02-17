import { preOrderTraversal as recursivePreOrderTraversal } from './recursion'
import { preOrderTraversal as iterativePreOrderTraversal } from './iteration'
import { BinaryTreeNode } from 'data-structures/src/binary_tree'

describe('Pre order traversal', () => {
  it('Should return a correct list with recursive traversal', () => {
    expect(
      recursivePreOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([0, 1, 2, 3, 4, 5, 6])
  })

  it('Should return a correct list with iterative traversal', () => {
    expect(
      iterativePreOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([0, 1, 2, 3, 4, 5, 6])
  })
})
