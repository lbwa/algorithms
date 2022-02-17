package postorder

import binarytree "algorithms/data-structures/src/binary_tree"

func Iterative(root *binarytree.Node) []int {
	answer := []int{}
	if root == nil {
		return answer
	}

	stack := []*binarytree.Node{root}
	for len(stack) > 0 {
		currentIndex := len(stack) - 1
		current := stack[currentIndex]
		stack = stack[:currentIndex]
		answer = append([]int{current.Val.(int)}, answer...)

		if current.Left != nil {
			stack = append(stack, current.Left)
		}
		if current.Right != nil {
			stack = append(stack, current.Right)
		}
	}

	return answer
}
