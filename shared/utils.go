package utils

import (
	"reflect"
	"testing"
)

// Swap two items in the list
func Swap(list *[]int, a, b int) {
	(*list)[a], (*list)[b] = (*list)[b], (*list)[a]
}

// Expect is a unit test matcher
func Expect(t *testing.T, got, want interface{}) {
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
}
