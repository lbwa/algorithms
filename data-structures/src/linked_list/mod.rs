type Link<Value> = Option<Box<ListNode<Value>>>;
#[derive(PartialEq, Eq, Debug)]
pub struct ListNode<Value> {
  pub val: Value,
  pub next: Link<Value>,
}

impl<Value> ListNode<Value> {
  #[inline]
  pub fn new(val: Value) -> Self {
    ListNode { val, next: None }
  }
}

/// [Impl in Rust std](https://doc.rust-lang.org/std/collections/struct.LinkedList.html)
pub struct LinkedList<Value> {
  head: Link<Value>,
}

pub struct IntoIter<Value>(LinkedList<Value>);

pub struct Iter<'node, Value> {
  next: Option<&'node ListNode<Value>>,
}

impl<Value> Default for LinkedList<Value> {
  fn default() -> Self {
    LinkedList { head: None }
  }
}

impl<Value> LinkedList<Value> {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn peek(&self) -> Option<&Value> {
    self.head.as_ref().map(|node| &node.val)
  }

  pub fn peek_mut(&mut self) -> Option<&mut Value> {
    self.head.as_mut().map(|node| &mut node.val)
  }
}

// push_xx
impl<Value> LinkedList<Value> {
  pub fn push_front(&mut self, val: Value) {
    self.head = Some(Box::new(ListNode {
      val,
      next: self.head.take(),
    }));
  }

  pub fn push_back(&mut self, val: Value) {
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
}

/// pop_xx
impl<Value> LinkedList<Value> {
  // pub fn pop_front(&mut self) -> Option<Box<ListNode<Value>>> {
  //   // Option.replace is equivalent to mem::replace, see https://doc.rust-lang.org/std/option/enum.Option.html#method.replace and
  //   // https://doc.rust-lang.org/std/option/enum.Option.html#method.replace
  //   // https://doc.rust-lang.org/std/mem/fn.replace.html
  //   // https://doc.rust-lang.org/1.58.1/src/core/option.rs.html#1348
  //   let mut deleted = std::mem::replace(&mut self.head, None);
  //   if deleted.is_some() {
  //     self.head = deleted.as_mut()?.next.take();
  //     deleted
  //   } else {
  //     None
  //   }
  // }

  // pub fn pop_front(&mut self) -> Option<Box<ListNode<Value>>> {
  //   let mut deleted = self.head.take();
  //   if deleted.is_some() {
  //     self.head = deleted.as_mut().unwrap().next.take();
  //     deleted
  //   } else {
  //     None
  //   }
  // }

  pub fn pop_front(&mut self) -> Option<Box<ListNode<Value>>> {
    self.head.take().map(|mut deleted| {
      self.head = deleted.next.take();
      deleted
    })
  }
}

/// iterator
impl<Value> LinkedList<Value> {
  /// 返回迭代器，其中后续 Iterator trait 的实现也是针对 IntoInter 结构体，而非 LinkedList 结构体！！
  /// > 此处亦可直接实现 std::iter::IntoIterator trait，参考 https://doc.rust-lang.org/std/iter/trait.IntoIterator.html
  #[allow(clippy::should_implement_trait)]
  pub fn into_iter(self) -> IntoIter<Value> {
    IntoIter(self)
  }

  pub fn iter(&self) -> Iter<Value> {
    Iter {
      next: self.head.as_deref(),
    }
  }
}

impl<Value> Iterator for IntoIter<Value> {
  type Item = Box<ListNode<Value>>;
  fn next(&mut self) -> Option<Self::Item> {
    let IntoIter(linked_list) = self;
    linked_list.pop_front()
  }
}

impl<'node, Value> Iterator for Iter<'node, Value> {
  type Item = &'node Value;

  fn next(&mut self) -> Option<Self::Item> {
    self.next.map(|node| {
      self.next = node.next.as_deref();
      &node.val
    })
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_push() {
    let mut linked_list = LinkedList::new();

    for v in 1..5 {
      linked_list.push_back(v);
    }

    assert_eq!(linked_list.peek(), Some(&1));
    assert_eq!(linked_list.peek_mut(), Some(&mut 1));
    assert_eq!(
      linked_list.head,
      Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
          val: 2,
          next: Some(Box::new(ListNode {
            val: 3,
            next: Some(Box::new(ListNode { val: 4, next: None })),
          })),
        })),
      }))
    );

    linked_list.push_front(0);
    assert_eq!(
      linked_list.head,
      Some(Box::new(ListNode {
        val: 0,
        next: Some(Box::new(ListNode {
          val: 1,
          next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
              val: 3,
              next: Some(Box::new(ListNode { val: 4, next: None })),
            })),
          })),
        }))
      }))
    );
  }

  #[test]
  fn test_pop() {
    let mut linked_list = LinkedList::new();

    for input in 0..5 {
      linked_list.push_back(input);
    }

    assert_eq!(
      linked_list.pop_front(),
      Some(Box::new(ListNode { val: 0, next: None }))
    );

    for expect in 1..5 {
      let d = linked_list.pop_front();
      assert_eq!(
        d,
        Some(Box::new(ListNode {
          val: expect,
          next: None
        }))
      )
    }

    assert_eq!(linked_list.head, None);
    assert_eq!(linked_list.pop_front(), None);
  }

  #[test]
  fn test_peek() {
    let mut linked_list = LinkedList::new();

    for input in 0..5 {
      linked_list.push_back(input);
    }

    assert_eq!(linked_list.peek(), Some(&0));
    assert_eq!(linked_list.peek_mut(), Some(&mut 0));

    if let Some(val) = linked_list.peek_mut() {
      *val = 10;
    }
    assert_eq!(
      linked_list.pop_front(),
      Some(Box::new(ListNode {
        val: 10,
        next: None
      }))
    );
  }

  #[test]
  fn test_into_iter() {
    let mut linked_list = LinkedList::new();
    for input in 11..16 {
      linked_list.push_back(input);
    }

    let mut iter = linked_list.into_iter();
    for expect in 11..16 {
      assert_eq!(iter.next().unwrap().val, expect);
    }
    assert_eq!(iter.next(), None)
  }

  #[test]
  fn test_iter() {
    let mut linked_list = LinkedList::new();
    for input in 0..4 {
      linked_list.push_back(input);
    }

    let mut iter = linked_list.iter();
    for expect in 0..4 {
      assert_eq!(iter.next(), Some(&expect));
    }

    for _ in 0..2 {
      assert_eq!(iter.next(), None)
    }
  }
}
