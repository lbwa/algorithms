package preorder

import binarytree "algorithms/data-structures/src/binary_tree"

// Recursive for binary tree pre-order traversal
func Recursive(root *binarytree.Node) []int {
	answer := []int{}
	traversal(root, &answer)
	return answer
}

func traversal(root *binarytree.Node, answer *[]int) {
	if root == nil {
		return
	}

	*answer = append(*answer, root.Val.(int))
	traversal(root.Left, answer)
	traversal(root.Right, answer)
}
