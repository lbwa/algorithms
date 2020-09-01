package trie

// Trie defines a trie tree node
// @see https://en.wikipedia.org/wiki/Trie
type Trie struct {
	isWord bool
	child  map[rune]*Trie
}

// Insert is used to insert a new node if the path does not exist
func (root *Trie) Insert(word string) {
	node := root
	for _, char := range word {
		if _, ok := node.child[char]; !ok {
			node.child[char] = &Trie{isWord: false, child: make(map[rune]*Trie)}
		}
		node = node.child[char]
	}
	node.isWord = true
}

// Search is used to search node from specific trie tree
func (root *Trie) Search(word string) bool {
	node := root
	for _, char := range word {
		if _, ok := node.child[char]; !ok {
			return false
		}
		node = node.child[char]
	}
	return node.isWord
}

// StartsWith is used to judge prefix string
func (root *Trie) StartsWith(prefix string) bool {
	node := root
	for _, char := range prefix {
		if _, ok := node.child[char]; !ok {
			return false
		}
		node = node.child[char]
	}
	return true
}
