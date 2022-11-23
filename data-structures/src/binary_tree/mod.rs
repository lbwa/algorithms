#[derive(Debug, PartialEq, Eq, Clone)]
pub struct TreeNode {
  pub val: i32,
  pub left: Option<Box<TreeNode>>,
  pub right: Option<Box<TreeNode>>,
}

impl TreeNode {
  #[inline]
  pub fn new(val: i32) -> Self {
    TreeNode {
      val,
      left: None,
      right: None,
    }
  }
}

pub fn to_tree(vec: Vec<Option<i32>>) -> Option<Box<TreeNode>> {
  use std::collections::VecDeque;
  let mut head = Some(Box::new(TreeNode::new(vec[0].unwrap())));
  let mut queue = VecDeque::new();
  queue.push_back(head.as_mut().unwrap());

  for children in vec[1..].chunks(2) {
    if let Some(root) = queue.pop_front() {
      if let Some(&Some(left_val)) = children.get(0) {
        root.left = Some(Box::new(TreeNode::new(left_val)));
        queue.push_back(root.left.as_mut().unwrap());
      }
      if let Some(&Some(right_val)) = children.get(1) {
        root.right = Some(Box::new(TreeNode::new(right_val)));
        queue.push_back(root.right.as_mut().unwrap());
      }
    }
  }
  head
}

#[macro_export]
macro_rules! tree {
  // `()` indicates that the macro takes no argument.
  () => {
      // The macro will expand into the contents of this block.
      None
  };
  // the `expr` designator is used for expressions.
  ($($e:expr),*) => {
    {
      // the `stringify` macro converts an `&e` into a string.
      let vec = vec![$(stringify!($e)), *];
      let vec = vec.into_iter().map(|v| v.parse::<i32>().ok()).collect::<Vec<_>>();
      data_structures::binary_tree::to_tree(vec)
    }
  };
  ($($e:expr,)*) => {(tree![$($e),*])};
}
