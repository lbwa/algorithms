package preorder

import binarytree "algorithms/data-structures/src/binary_tree"

// Iterative for post-order traversal
func Iterative(root *binarytree.Node) []int {
	answer := []int{}
	if root == nil {
		return answer
	}

	stack := []*binarytree.Node{root}
	for len(stack) > 0 {
		latestIndex := len(stack) - 1
		current := stack[latestIndex]
		stack = stack[:latestIndex]
		answer = append(answer, current.Val.(int))

		if current.Right != nil {
			stack = append(stack, current.Right)
		}
		if current.Left != nil {
			stack = append(stack, current.Left)
		}
	}

	return answer
}
