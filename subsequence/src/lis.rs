/// ### [Patience sorting](https://en.wikipedia.org/wiki/Patience_sorting)
/// - 伪代码参考 https://en.wikipedia.org/wiki/Longest_increasing_subsequence#Efficient_algorithms
/// - 推荐阅读 [DP, Binary search, BIT Solutions - Picture explain](https://leetcode.com/problems/longest-increasing-subsequence/discuss/1326308/C%2B%2BPython-DP-Binary-Search-BIT-Solutions-Picture-explain-O(NlogN))
/// - [Java/Python Binary Search O(nlogn) time with explanations](https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation)
/// - [打印 LIS](https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation/206357)
/// - [Princeton lecture pdf](https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf)
pub fn length_of_lis(nums: Vec<i32>) -> i32 {
  // 一种推荐思路，因为 patience sort 的操作流程与寻找 LIS 的流程基本相同，我们用 patience
  // sort/game 的思路思考 LIS 的构建。patience sort 的牌堆由左至右是递增的，LIS 也是。
  // patience sort 每插入一张牌的流程规则同 LIS 一样。并且每插入的一张牌，都有一个 back
  // pointer 指向上一个牌堆的顶层牌，构成 LIS 的一部分。最终得到牌堆，包含了所有可能的 LIS
  // 的组合（只有部分牌参与了），即最终的牌堆个数就是 LIS 的长度。
  // 推荐阅读 https://leetcode.com/problems/longest-increasing-subsequence/discuss/1326308/C%2B%2BPython-DP-Binary-Search-BIT-Solutions-Picture-explain-O(NlogN)
  let mut top_on_piles = vec![0; nums.len()];
  let mut piles_length = 0; // 初始是 0 个 piles

  for num in nums {
    // 循环体内逻辑本质上是在进行 patience sort，因为我们仅考虑 piles 数量，
    // 且牌堆内部是递减的，牌堆间由左至右是递增的！！故始终仅保留 piles 的最上层的一张牌。
    // 为了能够快速找到 num 合适的牌堆，且基于 patience sort 的特点，由左至右的 piles
    // 是递增的，那么我们可以借助 **二分查找** ，快速找到插入位置
    let (mut left, mut right) = (0, piles_length);
    while left < right {
      let mid = left + ((right - left) >> 1);
      if num > top_on_piles[mid] {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    top_on_piles[left] = num; // 类比于将当前 num 放置到合适的 pile 顶端
    if left == piles_length {
      // 如果索引超出牌堆，，则表示需要新建牌堆来放置 num，以符合 patience sort 的规则
      piles_length += 1; // 新建牌堆
    }
  }

  piles_length as i32 // 牌堆个数是 LIS 的长度
}

#[test]
fn test_length_of_lis() {
  vec![(vec![10, 9, 2, 5, 3, 7, 101, 18], 4)]
    .into_iter()
    .for_each(|(nums, expect)| {
      assert_eq!(length_of_lis(nums), expect);
    })
}

/// - 伪代码参考 https://en.wikipedia.org/wiki/Longest_increasing_subsequence#Efficient_algorithms
/// - https://leetcode.com/problems/longest-increasing-subsequence/discuss/1326308/C%2B%2BPython-DP-Binary-Search-BIT-Solutions-Picture-explain-O(NlogN)
/// - https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/LongestIncreasingSubsequence.pdf
/// - https://leetcode.com/problems/longest-increasing-subsequence/discuss/74824/JavaPython-Binary-search-O(nlogn)-time-with-explanation/206357
pub fn path_of_lis(nums: Vec<usize>) -> Vec<usize> {
  // store the last value of every piles (top of piles)
  let mut piles = vec![0; nums.len()];
  // store index instead of value for tracing path purpose
  let mut index_piles = vec![0; nums.len()];
  // back_pointers[i] point to the index of previous element in the LIS
  // 即在 LIS 中， nums[i] 的前一个元素的索引为 back_pointers[i]
  let mut back_pointers = vec![None; nums.len()];
  let mut piles_length = 0;

  for (i, &num) in nums.iter().enumerate() {
    let (mut left, mut right) = (0, piles_length);
    while left < right {
      let mid = left + ((right - left) >> 1);
      if num > piles[mid] {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    piles[left] = num;
    index_piles[left] = i;
    back_pointers[i] = if left > 0 {
      Some(index_piles[left - 1])
    } else {
      None
    };
    if left == piles_length {
      piles_length += 1;
    }
  }

  let mut path = vec![];
  // 起始于最长的一个 LIS 的最后一个元素
  let mut cur = Some(index_piles[piles_length - 1]);
  while let Some(prev) = cur {
    path.push(nums[prev]);
    cur = back_pointers[prev];
  }
  path.reverse();
  path
}

#[test]
fn test_path_of_lis() {
  vec![(vec![2, 6, 8, 3, 4, 5, 1], vec![2, 3, 4, 5])]
    .into_iter()
    .for_each(|(s, expect)| {
      assert_eq!(path_of_lis(s), expect);
    })
}
