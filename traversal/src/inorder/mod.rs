use data_structures::binary_tree::TreeNode;

pub fn iterative_inorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut stack = Vec::new();
  let mut result = Vec::new();
  let mut current = root.as_ref();
  while current.is_some() || !stack.is_empty() {
    while let Some(node) = current {
      stack.push(node);
      current = node.left.as_ref();
    }
    if let Some(node) = stack.pop() {
      result.push(node.val);
      current = node.right.as_ref();
    }
  }
  result
}

pub fn recursive_inorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut result = Vec::new();
  if let Some(node) = root {
    result.extend(recursive_inorder(&node.left));
    result.push(node.val);
    result.extend(recursive_inorder(&node.right));
  }
  result
}

#[test]
fn test_binary_inorder() {
  use data_structures::tree;
  vec![(tree!(1, None, 2, 3), vec![1, 3, 2])]
    .into_iter()
    .for_each(|(root, expect)| {
      assert_eq!(iterative_inorder(&root), expect);
      assert_eq!(recursive_inorder(&root), expect);
    })
}
