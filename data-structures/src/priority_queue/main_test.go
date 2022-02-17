package priorityqueue

import (
	"reflect"
	"testing"
)

func expect(t *testing.T, got, want interface{}) {
	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v, want %v", got, want)
	}
}

func TestSolution(t *testing.T) {
	q := New(func(a, b int) bool {
		return a < b
	})
	expect(t, q.Size(), 0)
	deleted0, ok0 := q.Poll()
	expect(t, deleted0, -1)
	expect(t, ok0, false)
	q.Insert(100)
	expect(t, q.Size(), 1)
	expect(t, q.Peek(), 100)
	q.Insert(200)
	expect(t, q.Size(), 2)
	expect(t, q.Peek(), 200)
	q.Insert(300)
	expect(t, q.Size(), 3)
	expect(t, q.Peek(), 300)
	deleted, ok := q.Poll()
	expect(t, deleted, 300)
	expect(t, ok, true)
	expect(t, q.Size(), 2)
	expect(t, q.Peek(), 200)
}
