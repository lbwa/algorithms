package sorts

import utils "algorithms/shared"

// QuickSort transitional function for array/slice in-place sorting
func QuickSort(list *[]int) {
	sort(list, 0, len(*list)-1)
}

func sort(list *[]int, low, high int) {
	if low >= high {
		return
	}
	index := partition(list, low, high)
	sort(list, low, index-1)
	sort(list, index+1, high)
}

func partition(list *[]int, low, high int) int {
	utils.Swap(list, high, low+(high-low)/2)
	pivot := (*list)[high]
	j := low
	for i := low; i < high; i++ {
		if (*list)[i] < pivot {
			utils.Swap(list, i, j)
			j++
		}
	}
	utils.Swap(list, j, high)
	return j
}

// Quick sort struct for array/slice in-place sorting
type Quick struct {
	ptr *[]int
}

func (q Quick) sort(low, high int) {
	if low >= high {
		return
	}
	index := q.partition(low, high)
	q.sort(low, index-1)
	q.sort(index+1, high)
}

func (q Quick) partition(low, high int) int {
	utils.Swap(q.ptr, high, low+(high-low)/2)
	pivot, j := (*q.ptr)[high], low
	for i := low; i < high; i++ {
		if (*q.ptr)[i] < pivot {
			utils.Swap(q.ptr, i, j)
			j++
		}
	}
	utils.Swap(q.ptr, j, high)
	return j
}
