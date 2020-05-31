import { BinarySearchTree, TreeNode } from './index'
import { compareTo } from 'shared/utils'

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
})