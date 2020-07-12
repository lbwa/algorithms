package binarytree

// Node for shaping binary tree node
type Node struct {
	// It represents the empty set of methods and is satisfied by any value at all, since any value has zero or more methods.
	Val   interface{}
	Left  *Node
	Right *Node
}
