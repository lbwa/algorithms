use std::collections::{linked_list, LinkedList};

/// A.K.A. [multiset or bag](https://en.wikipedia.org/wiki/Multiset)，与 Set 最大不同之处在于允许重复值出现，且不支持删除操作
///
/// - https://algs4.cs.princeton.edu/13stacks/
/// - https://algs4.cs.princeton.edu/13stacks/Bag.java.html
#[derive(Debug, Clone, Default)]
pub struct Bag<Value>(Option<LinkedList<Value>>);

pub struct Iter<'value, Value>(linked_list::Iter<'value, Value>);

impl<Value> Bag<Value> {
  pub fn new() -> Self {
    Bag(None)
  }

  pub fn add(&mut self, val: Value) -> &Self {
    let Bag(ref mut head) = self;
    if head.is_none() {
      *head = Some(LinkedList::from([val]));
    } else {
      head
        .as_mut()
        .expect("head should be available")
        .push_back(val);
    }
    self
  }

  pub fn delete(&self) {
    unimplemented!("Bag structure doesn't support delete element.")
  }

  pub fn is_empty(&self) -> bool {
    let Bag(ref head) = self;
    head.is_none()
  }

  pub fn len(&self) -> usize {
    let Bag(ref head) = self;
    if head.is_some() {
      let mut count = 0usize;
      let head = head
        .as_ref()
        .expect("head should be available in the iteration");
      for _ in head {
        count += 1;
      }
      count
    } else {
      0
    }
  }

  pub fn iter(&self) -> Iter<'_, Value> {
    let Bag(ref head) = self;
    Iter(head.as_ref().expect("head should be available").iter())
  }
}

impl<'value, Value> Iterator for Iter<'value, Value> {
  type Item = &'value Value;

  fn next(&mut self) -> Option<Self::Item> {
    let Iter(ref mut iter) = self;
    iter.next()
  }
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

  #[test]
  fn test_iter() {
    let mut bag = Bag::new();

    for input in 0..10 {
      bag.add(input);
    }

    let mut iter = bag.iter();
    for expect in 0..10 {
      assert_eq!(iter.next(), Some(&expect));
    }

    assert!(!bag.is_empty());
    assert_eq!(bag.len(), 10);
  }
}
