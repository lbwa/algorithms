/// https://doc.rust-lang.org/1.64.0/src/alloc/collections/binary_heap.rs.html#266-270
pub struct PriorityQueue(Vec<isize>);

/// https://doc.rust-lang.org/1.64.0/src/alloc/collections/binary_heap.rs.html#359
impl PriorityQueue {
  pub fn new() -> Self {
    PriorityQueue(vec![0])
  }

  pub fn len(&self) -> usize {
    let PriorityQueue(ref vec) = self;
    let len = vec.len();
    if len > 1 {
      len - 1
    } else {
      0
    }
  }

  pub fn is_empty(&self) -> bool {
    self.len() < 1
  }

  pub fn peek(&self) -> Option<&isize> {
    let PriorityQueue(ref vec) = self;
    vec.get(1)
  }

  pub fn insert(&mut self, element: isize) {
    let PriorityQueue(ref mut vec) = self;
    let len = vec.len();
    vec.push(element);
    if len > 0 {
      sift_up(vec, len);
    }
  }

  pub fn poll(&mut self) -> Option<isize> {
    let PriorityQueue(ref mut vec) = self;
    let len = vec.len() - 1;
    if len > 0 {
      vec.swap(1, len);
      let ret = vec.pop();
      sift_down(vec, 1);
      ret
    } else {
      None
    }
  }
}

fn sift_up<E: PartialOrd>(vec: &mut Vec<E>, mut i: usize) {
  // 同层 2k 和 2k + 1 的父级都是 k
  let mut parent = i >> 1;
  while i > 1 && vec[parent] < vec[i] {
    vec.swap(parent, i);
    i = parent;
    parent = i >> 1;
  }
}

fn sift_down<E: PartialOrd>(vec: &mut Vec<E>, mut i: usize) {
  let mut child = i << 1;
  while child < vec.len() {
    // 因为是大顶堆 ，同层尽可能选择大数上浮
    if child + 1 < vec.len() && vec[child] < vec[child + 1] {
      child += 1;
    }
    if vec[i] >= vec[child] {
      break;
    }
    vec.swap(i, child);
    i = child;
    child = i << 1;
  }
}

#[test]
fn test_priority_queue() {
  let mut queue = PriorityQueue::new();
  for num in vec![5, 332, 4, 45, 6, 43, 3, 3, 1, 4, 3] {
    queue.insert(num);
  }

  assert_eq!(queue.len(), 11);
  assert_eq!(queue.peek(), Some(&332));

  for (i, &num) in vec![332, 45, 43, 6, 5, 4, 4, 3, 3, 3, 1].iter().enumerate() {
    assert_eq!(queue.poll(), Some(num));
    assert_eq!(queue.len(), 10 - i);
  }
  assert_eq!(queue.poll(), None);
  assert!(queue.is_empty());
}
