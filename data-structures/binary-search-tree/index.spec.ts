import { BinarySearchTree, TreeNode } from './index'
import { compareTo } from 'shared/utils'
import { isValidBinarySearchTree } from './validate'

describe('Binary search tree', () => {
  it('Should init a BinarySearchTree instance', () => {
    const search = new BinarySearchTree(null, (a: number, b: number) =>
      compareTo(a, b)
    )
    expect(search.isEmpty).toBeTruthy()
    expect(search.size).toBe(0)
    expect(search.get(0)).toBeNull()
    expect(search.contains(0)).toBeFalsy()
  })

  it('Should get a node', () => {
    const search = new BinarySearchTree(new TreeNode(0, 1, 1), compareTo)
    expect(search.size).toBe(1)
    expect(search.isEmpty).toBeFalsy()
    expect(search.contains(0)).toBeTruthy()
    expect(search.get(0)).toBe(1)
  })

  it('Should put a node', () => {
    const search = new BinarySearchTree(new TreeNode(0, 1, 1), compareTo)
    search.put(0, 2)
    expect(search.size).toBe(1)
    expect(search.isEmpty).toBeFalsy()
    expect(search.contains(0)).toBeTruthy()
    expect(search.get(0)).toBe(2)
  })

  it('Should put a new node', () => {
    const treeNode = new TreeNode(0, 1, 1)
    const search = new BinarySearchTree(treeNode, compareTo)
    search.put(1, 2)
    expect(search.size).toBe(2)
    expect(search.isEmpty).toBeFalsy()
    expect(search.contains(1)).toBeTruthy()
    expect(search.get(1)).toBe(2)
  })

  it('Should return a min key', () => {
    const search = new BinarySearchTree(new TreeNode(0, 1, 1), compareTo)
    search.put(1, 2)
    search.put(-1, 0)
    expect(search.minKey).toBe(-1)
  })

  it('Should return a max key', () => {
    const search = new BinarySearchTree(new TreeNode(0, 1, 1), compareTo)
    search.put(1, 2)
    search.put(-1, 0)
    expect(search.maxKey).toBe(1)
  })

  it('Should find a Kth key', () => {
    const search = new BinarySearchTree(new TreeNode(0, 0, 1), compareTo)
    search.put(1, 1)
    search.put(2, 2)
    search.put(3, 3)
    // 找到第 K 小的节点
    expect(search.select(0)?.key).toBe(0)
    expect(search.select(0)?.value).toBe(0)
    expect(search.select(0)?.size).toBe(4)
    expect(search.select(1)?.key).toBe(1)
    expect(search.select(1)?.value).toBe(1)
    expect(search.select(1)?.size).toBe(3)
    expect(search.select(3)).toEqual(new TreeNode(3, 3, 1))
    expect(search.select(5)).toBeNull()
  })
})

describe('validate binary search tree', () => {
  it('Should return true', () => {
    expect(isValidBinarySearchTree(null)).toBeTruthy()
    const peek = new TreeNode(0, 0, 1)
    const tree = new BinarySearchTree(peek, compareTo)
    tree.put(1, 1)
    tree.put(2, 2)
    tree.put(3, 3)

    expect(isValidBinarySearchTree(peek)).toBeTruthy()
  })

  it('Should return false', () => {
    expect(
      isValidBinarySearchTree(
        new TreeNode(1, 1, 2, null, new TreeNode(1, 1, 1))
      )
    ).toBeFalsy()

    expect(
      isValidBinarySearchTree(
        new TreeNode(
          1,
          1,
          4,
          new TreeNode(4, 4, 3, new TreeNode(3, 3, 1), new TreeNode(6, 6, 1))
        )
      )
    ).toBeFalsy()
  })
})
