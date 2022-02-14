use std::collections::LinkedList;

/// A.K.A. [multiset or bag](https://en.wikipedia.org/wiki/Multiset)，与 Set 最大不同之处在于允许重复值出现，且不支持删除操作
///
/// - https://algs4.cs.princeton.edu/13stacks/
/// - https://algs4.cs.princeton.edu/13stacks/Bag.java.html
#[derive(Debug, Clone, Default)]
pub struct Bag<Item>(Option<LinkedList<Item>>);

impl<Item> Bag<Item> {
  pub fn new() -> Self {
    Bag(None)
  }

  pub fn add(&mut self, val: Item) -> &Self {
    let Bag(ref mut head) = self;
    if head.is_none() {
      *head = Some(LinkedList::from([val]));
    } else {
      head.as_mut().expect("Unavailable head node").push_back(val);
    }
    self
  }

  pub fn is_empty(&self) -> bool {
    let Bag(ref head) = self;
    head.is_none()
  }

  pub fn len(&self) -> usize {
    let Bag(ref head) = self;
    if head.is_some() {
      let mut count = 0usize;
      let head = head.as_ref().expect("Unavailable head node");
      for _ in head {
        count += 1;
      }
      count
    } else {
      0
    }
  }

  // pub fn remove(&self) {
  //   unimplemented!("Bag doesn't support delete operation.")
  // }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_bag() {
    let mut bag = Bag::new();

    assert!(bag.is_empty());
    assert_eq!(bag.len(), 0);

    for val in 0..10 {
      bag.add(val);
    }

    assert!(!bag.is_empty());
    assert_eq!(bag.len(), 10);
  }
}
