pub fn insertion_sort(nums: &mut [isize]) {
  for i in 1..nums.len() {
    let mut j = i;

    // insert nums[i] into the sorted sequence nums[..i]
    while j > 0 && nums[j - 1] > nums[j] {
      nums.swap(j - 1, j);
      j -= 1;
    }
  }
}

#[test]
fn test_insertion_sort() {
  vec![(vec![5, 2, 4, 6, 1, 3], vec![1, 2, 3, 4, 5, 6])]
    .into_iter()
    .for_each(|(nums, expect)| {
      let mut nums = nums;
      insertion_sort(&mut nums);
      assert_eq!(nums, expect);
    })
}
