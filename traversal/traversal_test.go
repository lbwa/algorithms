/*
	# based on project root path
	$ go test ./traversal -v
*/

package traversal

import (
	binarytree "algorithms/data-structures/binary-tree"
	inorder "algorithms/traversal/in-order"
	levelorder "algorithms/traversal/level-order"
	"fmt"
	"reflect"
	"testing"
)

func createBinaryTree() binarytree.Node {
	return binarytree.Node{
		Val: 0,
		Left: &binarytree.Node{
			Val: 1,
			Left: &binarytree.Node{
				Val: 2,
			},
			Right: &binarytree.Node{
				Val: 3,
			},
		},
		Right: &binarytree.Node{
			Val: 4,
			Left: &binarytree.Node{
				Val: 5,
			},
			Right: &binarytree.Node{
				Val: 6,
			},
		},
	}
}

func expect(t *testing.T, got interface{}, want interface{}) {
	if !reflect.DeepEqual(got, want) {
		t.Errorf(`got %q, want %q`, got, want)
	}
}

func TestIterativeInOrder(t *testing.T) {
	tree := createBinaryTree()
	expect(t, inorder.Iterative(&tree), []int{2, 1, 3, 0, 5, 4, 6})
}

func TestRecursiveInOrder(t *testing.T) {
	tree := createBinaryTree()
	expect(t, inorder.Recursive(&tree), []int{2, 1, 3, 0, 5, 4, 6})
}

func TestIterativeLevelOrder(t *testing.T) {
	tree := createBinaryTree()
	want := []([]int){
		[]int{0},
		[]int{1, 4},
		[]int{2, 3, 5, 6},
	}
	fmt.Println(levelorder.Iterative(&tree))
	expect(t, levelorder.Iterative(&tree), want)
}
