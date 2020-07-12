package inorder

import binarytree "algorithms/data-structures/binary-tree"

// Iterative for binary tree in-order traversal
func Iterative(root *binarytree.Node) []int {
	answer := []int{}

	if root == nil {
		return answer
	}

	stack := []*binarytree.Node{}
	current := root
	for current != nil || len(stack) > 0 {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		latestIndex := len(stack) - 1
		current = stack[latestIndex]
		stack = stack[:latestIndex]
		answer = append(answer, current.Val.(int))
		current = current.Right
	}

	return answer
}
