use std::collections::HashMap;

#[derive(Default, Debug)]
pub struct Trie {
  is_word: bool,
  child: HashMap<char, Box<Trie>>, // or vec![Option<Box<Trie>>; 26]; see https://github.com/lbwa/leetcode/blob/d0e7c0fc861cfcaa66aac1d44cb55744fafe592c/src/medium_208/mod.rs
}

impl Trie {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn insert(&mut self, word: &str) {
    let mut current = self;

    for ch in word.chars() {
      if current.child.get(&ch).is_none() {
        current.child.insert(ch, Box::new(Trie::new()));
      }
      current = current.child.get_mut(&ch).unwrap();
    }

    current.is_word = true;
  }

  pub fn search(&self, word: &str) -> bool {
    let mut current = self;

    for ch in word.chars() {
      if current.child.get(&ch).is_none() {
        return false;
      }
      current = current.child.get(&ch).unwrap();
    }

    current.is_word
  }

  pub fn starts_with(&self, prefix: &str) -> bool {
    let mut current = self;

    for ch in prefix.chars() {
      if current.child.get(&ch).is_none() {
        return false;
      }
      current = current.child.get(&ch).unwrap();
    }

    true
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_search() {
    let mut trie = Trie::new();
    trie.insert("apple");

    for (input, expect) in [("apple", true), ("app", false)] {
      assert_eq!(trie.search(input), expect);
    }

    trie.insert("app");

    for (input, expect) in [("apple", true), ("app", true)] {
      assert_eq!(trie.search(input), expect);
    }
  }

  #[test]
  fn test_starts_with() {
    let mut trie = Trie::new();
    trie.insert("apple");

    for (input, expect) in [("apple", true), ("app", true), ("bpp", false)] {
      assert_eq!(trie.starts_with(input), expect);
    }
  }
}
