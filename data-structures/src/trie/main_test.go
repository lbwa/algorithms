package trie

import (
	utils "algorithms/shared"
	"testing"
)

func TestTrie(t *testing.T) {
	tree := Trie{isWord: false, child: make(map[rune]*Trie)}
	tree.Insert("apple")
	utils.Expect(t, tree.Search("apple"), true)
	utils.Expect(t, tree.Search("app"), false)
	utils.Expect(t, tree.StartsWith("app"), true)
	tree.Insert("app")
	utils.Expect(t, tree.Search("app"), true)
}
