package utils

// Swap two items in the list
func Swap(list *[]int, a, b int) {
	(*list)[a], (*list)[b] = (*list)[b], (*list)[a]
}
