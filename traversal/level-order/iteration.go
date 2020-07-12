package levelorder

import binarytree "algorithms/data-structures/binary-tree"

// Iterative for binary tree level-order traversal
func Iterative(root *binarytree.Node) [][]int {
	answer := [][]int{}

	if root == nil {
		return answer
	}

	queue := []*binarytree.Node{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		answer = append(answer, []int{})

		for i := 0; i < levelSize; i++ {
			current, levelIndex := queue[0], len(answer)-1
			queue = queue[1:]
			answer[levelIndex] = append(answer[levelIndex], current.Val.(int))

			if current.Left != nil {
				queue = append(queue, current.Left)
			}
			if current.Right != nil {
				queue = append(queue, current.Right)
			}
		}
	}

	return answer
}
