package priorityqueue

// Queue defines priority queue structure
type Queue struct {
	heap       []int
	comparator func(int, int) bool
}

// New is used to instantiate Queue struct
func New(comparator func(int, int) bool) Queue {
	return Queue{heap: []int{0}, comparator: comparator}
}

/*
	How to define property getters in golang
	@see https://golang.org/doc/effective_go.html#Getters
*/

// Size field getter
func (q *Queue) Size() int {
	return len(q.heap) - 1
}

// Peek field getter
func (q *Queue) Peek() int {
	return q.heap[1]
}

// Insert is used to insert a new element into queue
func (q *Queue) Insert(el int) {
	q.heap = append(q.heap, el)
	newIndex := q.Size()
	q.swim(newIndex)
}

// Poll is used to remove peek element in queue
func (q *Queue) Poll() (int, bool) {
	tail := q.Size()
	if tail <= 0 {
		return -1, false
	}
	swap(&q.heap, 1, tail)
	deleted := q.heap[tail]
	q.heap = q.heap[:tail]
	q.sink(1)
	return deleted, true
}

func (q *Queue) swim(index int) {
	for index > 1 && q.comparator(q.heap[index/2], q.heap[index]) {
		swap(&q.heap, index/2, index)
		index = index / 2
	}
}

func (q *Queue) sink(index int) {
	for 2*index <= q.Size() {
		childIndex := 2 * index
		if childIndex < q.Size() && q.comparator(q.heap[childIndex], q.heap[childIndex+1]) {
			childIndex++
		}

		if q.comparator(q.heap[index], q.heap[childIndex]) == false {
			break
		}

		swap(&q.heap, childIndex, index)
		index = childIndex
	}
}

func swap(num *[]int, a, b int) {
	(*num)[a], (*num)[b] = (*num)[b], (*num)[a]
}
