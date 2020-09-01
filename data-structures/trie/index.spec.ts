import { Trie } from './index'

describe('Trie tree', () => {
  it('Normal trie tree operation', () => {
    const tree = new Trie()
    tree.insert('apple')
    expect(tree.root.size).toBe(1)
    expect(tree.search('apple')).toBeTruthy()
    expect(tree.search('app')).toBeFalsy()
    expect(tree.startsWith('app')).toBeTruthy()
    expect(tree.insert('app')).toBeUndefined()
    expect(tree.search('app')).toBeTruthy()
  })
})
