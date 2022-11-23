use data_structures::binary_tree::TreeNode;

pub fn iterative_postorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut stack = vec![root];
  let mut ans = std::collections::VecDeque::new();

  while !stack.is_empty() {
    if let Some(current) = stack.pop() {
      ans.push_front(current.as_ref().unwrap().val);
      if current.as_ref().unwrap().left.is_some() {
        stack.push(&current.as_ref().unwrap().left);
      }
      if current.as_ref().unwrap().right.is_some() {
        stack.push(&current.as_ref().unwrap().right);
      }
    } else {
      unreachable!("stack should not contain None");
    }
  }
  Vec::from(ans)
}

pub fn recursive_postorder(root: &Option<Box<TreeNode>>) -> Vec<i32> {
  let mut ans = vec![];
  if let Some(node) = root {
    ans.extend(recursive_postorder(&node.left));
    ans.extend(recursive_postorder(&node.right));
    ans.push(node.val);
  }
  ans
}

#[test]
fn test_binary_postorder() {
  use data_structures::tree;

  vec![(tree!(1, None, 2, 3), vec![3, 2, 1])]
    .iter()
    .for_each(|(root, expect)| {
      assert_eq!(iterative_postorder(root), *expect);
      assert_eq!(recursive_postorder(root), *expect);
    })
}
