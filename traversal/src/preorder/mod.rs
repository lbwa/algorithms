use data_structures::binary_tree::TreeNode;

pub fn iterative_preorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut stack = Vec::from([root]);
  let mut ans = vec![];

  while !stack.is_empty() {
    if let Some(current) = stack.pop() {
      ans.push(current.as_ref().unwrap().val);
      if current.as_ref().unwrap().right.is_some() {
        stack.push(&current.as_ref().unwrap().right);
      }
      if current.as_ref().unwrap().left.is_some() {
        stack.push(&current.as_ref().unwrap().left);
      }
    } else {
      unreachable!();
    }
  }

  ans
}

pub fn recursive_preorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut ans = vec![];
  if let Some(node) = root {
    ans.push(node.val);
    ans.extend(recursive_preorder(&node.left));
    ans.extend(recursive_preorder(&node.right));
  }
  ans
}

#[test]
fn test_binary_preorder() {
  use data_structures::tree;

  vec![(tree!(1, None, 2, 3), vec![1, 2, 3])]
    .iter()
    .for_each(|(root, expect)| {
      assert_eq!(iterative_preorder(root), *expect);
      assert_eq!(recursive_preorder(root), *expect);
    })
}
