#[derive(PartialEq, Eq, Debug)]
pub struct ListNode {
  pub val: i32,
  pub next: Option<Box<ListNode>>,
}

impl ListNode {
  #[inline]
  pub fn new(val: i32) -> Self {
    ListNode { val, next: None }
  }
}

pub struct LinkList(Option<Box<ListNode>>);

impl LinkList {
  pub fn new() -> Self {
    Self(None)
  }

  pub fn append(&mut self, val: i32) -> &mut Self {
    let LinkList(ref mut head) = self;

    let mut current = head;

    if current.is_none() {
      *current = Some(Box::new(ListNode::new(val)));
      return self;
    }

    while current.as_ref().unwrap().next.is_some() {
      current = &mut current.as_mut().unwrap().next;
    }

    current.as_mut().unwrap().next = Some(Box::new(ListNode::new(val)));

    self
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  fn to_list(vec: Vec<i32>) -> Option<Box<ListNode>> {
    let mut current = None;
    for &value in vec.iter().rev() {
      let mut node = ListNode::new(value);
      node.next = current;
      current = Some(Box::new(node));
    }
    current
  }

  #[test]
  fn should_work() {
    let mut list = LinkList::new();
    for v in 1..5 {
      list.append(v);
    }
    let LinkList(head) = list;
    assert_eq!(head, to_list(vec![1, 2, 3, 4]));
  }
}
