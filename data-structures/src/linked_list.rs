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
/// [Impl in Rust std](https://doc.rust-lang.org/std/collections/struct.LinkedList.html)
pub struct LinkedList {
  head: Link,
}

impl LinkedList {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn push_back(&mut self, val: i32) {
    let LinkedList { head } = self;

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
    // Option.replace is equivalent to mem::replace, see https://doc.rust-lang.org/std/option/enum.Option.html#method.replace and
    // https://doc.rust-lang.org/std/option/enum.Option.html#method.replace
    // https://doc.rust-lang.org/std/mem/fn.replace.html
    // https://doc.rust-lang.org/1.58.1/src/core/option.rs.html#1348
    let mut deleted = std::mem::replace(&mut self.head, None);
    if deleted.is_some() {
      self.head = deleted.as_mut()?.next.take();
      deleted
    } else {
      None
    }
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
  fn test_linked_list() {
    let mut linked_list = LinkedList::new();
    for v in 1..5 {
      linked_list.push_back(v);
    }
    assert_eq!(linked_list.head, to_list(vec![1, 2, 3, 4]));

    let deleted = linked_list.pop_front();
    assert_eq!(deleted, Some(Box::new(ListNode { val: 1, next: None })));

    for expect in [2, 3, 4] {
      let d = linked_list.pop_front();
      println!("{:?}", d);
      assert_eq!(
        d,
        Some(Box::new(ListNode {
          val: expect,
          next: None
        }))
      )
    }

    assert_eq!(linked_list.head, None);
    assert_eq!(linked_list.pop_front(), None)
  }
}
