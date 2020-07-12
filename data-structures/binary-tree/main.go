package structures

// BinaryTreeNode for shaping binary tree node
type BinaryTreeNode struct {
	// It represents the empty set of methods and is satisfied by any value at all, since any value has zero or more methods.
	Val   interface{}
	Left  *BinaryTreeNode
	Right *BinaryTreeNode
}
