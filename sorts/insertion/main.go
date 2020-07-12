package insertion

import (
	utils "algorithms/shared"
)

// Sort for in-place sort
func Sort(list *[]int) *[]int {
	for i := 0; i < len(*list); i++ {
		for j := i; j > 0 && (*list)[j] < (*list)[j-1]; j-- {
			utils.Swap(list, j-1, j)
		}
	}
	return list
}
