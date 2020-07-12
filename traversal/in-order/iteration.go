package traversal

import (
	structures "algorithms/data-structures/binary-tree"
)

// IterativeInOrder for binary tree in-order traversal
func IterativeInOrder(root *structures.BinaryTreeNode) []int {
	answer := []int{}

	if root == nil {
		return answer
	}

	stack := []*structures.BinaryTreeNode{}
	current := root
	for current != nil || len(stack) > 0 {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		latestIndex := len(stack) - 1
		current = stack[latestIndex]
		stack = stack[:latestIndex]
		answer = append(answer, current.Val)
		current = current.Right
	}

	return answer
}
