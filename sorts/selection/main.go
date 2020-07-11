package sorts

import (
	utils "algorithms/shared"
)

// Selection sort
func Selection(arr *[]int) []int {
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
