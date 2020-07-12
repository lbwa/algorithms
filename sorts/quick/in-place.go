package quick

import utils "algorithms/shared"

// Sort transitional function for array/slice in-place sorting
func Sort(list *[]int) {
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

// Sorting struct for array/slice in-place sorting
type Sorting struct {
	Raw *[]int
}

// Sort method is part of Sorting struct
func (q Sorting) Sort(low, high int) {
	if low >= high {
		return
	}
	index := q.partition(low, high)
	q.Sort(low, index-1)
	q.Sort(index+1, high)
}

func (q Sorting) partition(low, high int) int {
	utils.Swap(q.Raw, high, low+(high-low)/2)
	pivot, j := (*q.Raw)[high], low
	for i := low; i < high; i++ {
		if (*q.Raw)[i] < pivot {
			utils.Swap(q.Raw, i, j)
			j++
		}
	}
	utils.Swap(q.Raw, j, high)
	return j
}
