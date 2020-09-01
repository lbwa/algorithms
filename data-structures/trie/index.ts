import { TreeNode } from 'data-structures/binary-search-tree'

type TrieNode = { isWord: boolean } & Map<string, TrieNode>

/**
 * @see https://leetcode-cn.com/leetbook/read/trie/x0gnuh/
 */
export class Trie {
  constructor(public root: TrieNode = new Map() as TrieNode) {}

  insert(word: string): void {
    let { root } = this
    for (const char of word) {
      if (!root.has(char)) {
        // insert a new node if the path does not exist
        const node = new Map() as TrieNode
        node.isWord = false
        root.set(char, node)
      }
      root = root.get(char)!
    }
    root.isWord = true
  }

  search(word: string): boolean {
    let { root } = this
    for (const char of word) {
      if (!root.has(char)) {
        return false
      }
      root = root.get(char)!
    }
    return root.isWord
  }

  startsWith(prefix: string): boolean {
    let { root } = this
    for (const char of prefix) {
      if (!root.has(char)) {
        return false
      }
      root = root.get(char)!
    }
    return true
  }
}
