package bubble

import (
	utils "algorithms/shared"
)

// Sort for in-place bubble sorting
func Sort(list *[]int) *[]int {
	swapped := true
	length := len(*list)

	for swapped {
		swapped = false
		for i := 0; i < length; i++ {
			if i < len(*list)-1 && (*list)[i] > (*list)[i+1] {
				utils.Swap(list, i, i+1)
				swapped = true
			}
		}
		length--
	}

	return list
}
