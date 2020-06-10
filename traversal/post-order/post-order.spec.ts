import { postOrderTraversal as recursivePostOrderTraversal } from './recursion'
import { postOrderTraversal as iterativePostOrderTraversal } from './iteration'
import { BinaryTreeNode } from 'data-structures/binary-tree'

describe('Post order traversal', () => {
  it('Should return a correct list with recursive traversal', () => {
    expect(
      recursivePostOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([2, 3, 1, 5, 6, 4, 0])
  })

  it('Should return a correct list with iterative traversal', () => {
    expect(
      iterativePostOrderTraversal(
        new BinaryTreeNode(
          0,
          new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)),
          new BinaryTreeNode(4, new BinaryTreeNode(5), new BinaryTreeNode(6))
        )
      )
    ).toEqual([2, 3, 1, 5, 6, 4, 0])
  })
})
