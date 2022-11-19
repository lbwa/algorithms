/// @see Introduction to Algorithms, 4th Edition, Chapter 2, Section 3, Page 39
///
/// 本质上理解归并排序可认为是两堆有序扑克牌的合并，每次从两堆牌顶端取最小（大）的牌放入输出堆中，直到两堆牌都取完。
/// 要达到上述两堆牌的有序同样可拆分为更小的子牌堆进行排序。本质上以上是基于 base case 的分治排序算法。最基础的
/// base case 是两张牌的排序，即两张牌的合并。
///
/// To understand how the MERGE procedure works, let’s return to our card-playing
/// motif. Suppose that you have two piles of cards face up on a table. Each pile is
/// sorted, with the smallest-value cards on top. You wish to merge the two piles
/// into a single sorted output pile, which is to be face down on the table. The basic
/// step consists of choosing the smaller of the two cards on top of the face-up piles,
/// removing it from its pile4which exposes a new top card4and placing this card
/// face down onto the output pile. Repeat this step until one input pile is empty, at
/// which time you can just take the remaining input pile and üip over the entire pile,
/// placing it face down onto the output pile.
pub fn merge_sort<Value>(list: &mut [Value])
where
  Value: Ord + Clone + Copy,
{
  fn sort<Value>(list: &mut [Value], left: usize, right: usize)
  where
    Value: Ord + Clone + Copy,
  {
    if left >= right {
      return;
    }
    let mid = left + ((right - left) >> 1);
    sort(list, left, mid);
    sort(list, mid + 1, right);
    merge(list, left, mid, right);
  }

  sort(list, 0, list.len() - 1);
}

/// @see Introduction to Algorithms, 4th Edition, Chapter 2, Section 3, Page 36
fn merge<Value>(list: &mut [Value], left: usize, mid: usize, right: usize)
where
  Value: Ord + Clone + Copy,
{
  let left_vec = list[left..=mid].to_vec();
  let right_vec = list[(mid + 1)..=right].to_vec();
  // i indicates the index of left_vec
  let mut i = 0;
  // j indicates the index of right_vec
  let mut j = 0;
  // k indicates the location in list to fill
  let mut k = left;

  // As long as each of the arrays left_vec and right_vec contains an unmerged element, copy the
  // smallest unmerged element from one of the arrays to list[left..=right]
  while i < left_vec.len() && j < right_vec.len() {
    if left_vec[i] <= right_vec[j] {
      list[k] = left_vec[i];
      i += 1;
    } else {
      list[k] = right_vec[j];
      j += 1;
    }
    k += 1;
  }

  // Having gone through one of left_vec and right_vec, copy the remaining elements of the end of
  // list[left..=right]
  while i < left_vec.len() {
    list[k] = left_vec[i];
    i += 1;
    k += 1;
  }
  while j < right_vec.len() {
    list[k] = right_vec[j];
    j += 1;
    k += 1;
  }
}

#[test]
fn test_merge_sort() {
  vec![(
    vec![3, 3, 43, 2, 3, 4, 1, 6, 7, 8, 34, 3, 4],
    vec![1, 2, 3, 3, 3, 3, 4, 4, 6, 7, 8, 34, 43],
  )]
  .iter_mut()
  .for_each(|(original, expect)| {
    merge_sort(original);
    assert_eq!(original, expect);
  });
}
