package traversal

import structures "algorithms/data-structures/binary-tree"

// RecursiveInOrder for binary tree in-order traversal
func RecursiveInOrder(root *structures.BinaryTreeNode) []int {
	answer := []int{}
	traversal(root, &answer)
	return answer
}

func traversal(root *structures.BinaryTreeNode, answer *[]int) {
	if root == nil {
		return
	}
	traversal(root.Left, answer)
	*answer = append(*answer, root.Val.(int))
	traversal(root.Right, answer)
}
