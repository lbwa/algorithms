package inorder

import binarytree "algorithms/data-structures/binary-tree"

// Recursive for binary tree in-order traversal
func Recursive(root *binarytree.Node) []int {
	answer := []int{}
	traversal(root, &answer)
	return answer
}

func traversal(root *binarytree.Node, answer *[]int) {
	if root == nil {
		return
	}
	traversal(root.Left, answer)
	*answer = append(*answer, root.Val.(int))
	traversal(root.Right, answer)
}
