package sorts

import (
	"algorithms/sorts/bubble"
	"algorithms/sorts/insertion"
	"algorithms/sorts/quick"
	"algorithms/sorts/selection"
	"testing"
)

func expect(t *testing.T, list *[]int) {
	for i := 0; i < len(*list); i++ {
		if i < len(*list)-1 && (*list)[i+1] < (*list)[i] {
			t.Errorf(`not sort`)
		}
	}
}

func TestBubbleSort(t *testing.T) {
	expect(t, bubble.Sort(&[]int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}))
}

func TestQuickSort(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	quick.Sort(&arr)
	expect(t, &arr)
}

func TestQuickStruct(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	s := quick.Sorting{Raw: &arr}
	s.Sort(0, len(*s.Raw)-1)
	expect(t, &arr)
}

func TestSelection(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	selection.Sort(&arr)
	expect(t, &arr)
}

func TestInsertion(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	insertion.Sort(&arr)
	expect(t, &arr)
}
