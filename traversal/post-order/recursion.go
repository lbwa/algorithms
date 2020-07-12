package postorder

import binarytree "algorithms/data-structures/binary-tree"

// Recursive for binary tree post-order traversal
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
	traversal(root.Right, answer)
	*answer = append(*answer, root.Val.(int))
}
