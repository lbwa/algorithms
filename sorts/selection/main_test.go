package sorts

import (
	"testing"
)

func TestSelection(t *testing.T) {
	arr := []int{9, 5, 4, 6, 5, 8, 9, 7, 10, 2, 3, 1}
	Selection(&arr)
	for i := 0; i < len(arr); i++ {
		if i < len(arr)-1 && arr[i+1] < arr[i] {
			t.Errorf(`not sort`)
		}
	}
}
