use core::fmt;

pub fn quick_sort<D: Ord + fmt::Debug>(vec: &mut Vec<D>) {
  sort(vec, 0, vec.len() - 1);
}

fn sort<D: Ord>(vec: &mut Vec<D>, start: usize, end: usize) {
  if start >= end {
    return;
  }

  let index = partition(vec, start, end);
  sort(vec, start, if index > 0 { index - 1 } else { 0 });
  sort(vec, index + 1, end);
}

fn partition<D: Ord>(vec: &mut Vec<D>, start: usize, end: usize) -> usize {
  let mid = start + ((end - start) >> 1);
  vec.swap(mid, end);
  let mut j = start;
  for i in start..end {
    if vec[i] < vec[end] {
      vec.swap(i, j);
      j += 1;
    }
  }
  vec.swap(j, end);
  j
}

#[test]
fn test_quick_sort() {
  vec![(
    vec![3, 3, 43, 2, 3, 4, 1, 6, 7, 8, 34, 3, 4],
    vec![1, 2, 3, 3, 3, 3, 4, 4, 6, 7, 8, 34, 43],
  )]
  .into_iter()
  .for_each(|(mut vec, expect)| {
    quick_sort(&mut vec);
    assert_eq!(vec, expect);
  })
}
