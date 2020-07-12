/*
	# based on project root path
	$ go test ./traversal -v
*/

package traversal

import (
	structures "algorithms/data-structures/binary-tree"
	traversal "algorithms/traversal/in-order"
	"reflect"
	"testing"
)

func TestInOrderTraversal(t *testing.T) {
	tree := structures.BinaryTreeNode{
		Val: 0,
		Left: &structures.BinaryTreeNode{
			Val: 1,
			Left: &structures.BinaryTreeNode{
				Val: 2,
			},
			Right: &structures.BinaryTreeNode{
				Val: 3,
			},
		},
		Right: &structures.BinaryTreeNode{
			Val: 4,
			Left: &structures.BinaryTreeNode{
				Val: 5,
			},
			Right: &structures.BinaryTreeNode{
				Val: 6,
			},
		},
	}
	want := []int{2, 1, 3, 0, 5, 4, 6}

	if got := traversal.IterativeInOrder(&tree); !reflect.DeepEqual(got, want) {
		t.Errorf(`got %q, want %q`, got, want)
	}
}

func TestRecursiveInOrder(t *testing.T) {
	tree := structures.BinaryTreeNode{
		Val: 0,
		Left: &structures.BinaryTreeNode{
			Val: 1,
			Left: &structures.BinaryTreeNode{
				Val: 2,
			},
			Right: &structures.BinaryTreeNode{
				Val: 3,
			},
		},
		Right: &structures.BinaryTreeNode{
			Val: 4,
			Left: &structures.BinaryTreeNode{
				Val: 5,
			},
			Right: &structures.BinaryTreeNode{
				Val: 6,
			},
		},
	}
	want := []int{2, 1, 3, 0, 5, 4, 6}

	if got := traversal.RecursiveInOrder(&tree); !reflect.DeepEqual(got, want) {
		t.Errorf(`got %q, want %q`, got, want)
	}
}
