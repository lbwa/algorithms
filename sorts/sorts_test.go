package sorts

import (
	"algorithms/sorts/quick"
	"testing"
)

func TestQuickSort(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	quick.Sort(&arr)
	for i := 0; i < len(arr); i++ {
		if i < len(arr)-1 && arr[i+1] < arr[i] {
			t.Errorf(`not sort`)
		}
	}
}

func TestQuickStruct(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	s := quick.Sorting{Raw: &arr}
	s.Sort(0, len(*s.Raw)-1)
	for i := 0; i < len(arr); i++ {
		if i < len(arr)-1 && arr[i+1] < arr[i] {
			t.Errorf(`not sort`)
		}
	}
}
