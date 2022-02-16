type Link = Option<Box<ListNode>>;
#[derive(PartialEq, Eq, Debug)]
pub struct ListNode {
  pub val: i32,
  pub next: Link,
}

impl ListNode {
  #[inline]
  pub fn new(val: i32) -> Self {
    ListNode { val, next: None }
  }
}

#[derive(Default)]
pub struct LinkList {
  head: Link,
}

impl LinkList {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn push_back(&mut self, val: i32) {
    let LinkList { head } = self;

    let mut current = head;

    if current.is_none() {
      *current = Some(Box::new(ListNode::new(val)));
      return;
    }

    while current
      .as_ref()
      .expect("Unavailable current node in while loop")
      .next
      .is_some()
    {
      current = &mut current
        .as_mut()
        .expect("Unavailable node in current.node")
        .next;
    }

    current.as_mut().expect("Couldn't mutate current.next").next =
      Some(Box::new(ListNode::new(val)));
  }

  pub fn pop_front(&mut self) -> Option<Box<ListNode>> {
    // https://doc.rust-lang.org/std/option/enum.Option.html#method.replace
    // https://doc.rust-lang.org/std/mem/fn.replace.html
    // let mut deleted = std::mem::replace(&mut self.head, None);
    // if deleted.is_some() {
    //   self.head = deleted.as_mut()?.next.take();
    //   deleted
    // } else {
    //   None
    // }

    let head = self.head.as_mut()?.next.take()?;
    // Option.replace is equivalent to mem::replace, see https://doc.rust-lang.org/std/option/enum.Option.html#method.replace and
    // https://doc.rust-lang.org/1.58.1/src/core/option.rs.html#1348
    self.head.replace(head)
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
  fn test_link_list() {
    let mut list = LinkList::new();
    for v in 1..5 {
      list.push_back(v);
    }
    assert_eq!(list.head, to_list(vec![1, 2, 3, 4]));

    let deleted = list.pop_front();
    assert_eq!(deleted, Some(Box::new(ListNode { val: 1, next: None })))
  }
}
