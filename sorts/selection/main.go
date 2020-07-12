package selection

import (
	utils "algorithms/shared"
)

// Sort for in-place sorting
func Sort(arr *[]int) []int {
	for i := 0; i < len(*arr); i++ {
		min := i
		for j := i; j < len(*arr); j++ {
			if (*arr)[j] < (*arr)[min] {
				min = j
			}
		}
		utils.Swap(arr, i, min)
	}
	return *arr
}
