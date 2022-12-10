/// - https://youtu.be/KLBCUx1is2c
/// - https://leetcode.cn/problems/longest-common-subsequence/solutions/696763/zui-chang-gong-gong-zi-xu-lie-by-leetcod-y7u0/
/// - https://leetcode.cn/problems/longest-common-subsequence/solutions/590896/1143-zui-chang-gong-gong-zi-xu-lie-dong-zde2v/
/// 核心逻辑是基于 subproblem 分析，在降低数据规模的前提下，通过求解前缀或后缀（即子序列）的 LCS，再加上当前被排除的字符判断是否相同，来决定是否 lcs + 1
pub fn length_of_lcs(s1: &str, s2: &str) -> usize {
  let (m, n) = (s1.len(), s2.len());
  // dp[i][j] 表示 s1[1..i]（预设索引始于1，而不是 0）子字符串和 s2[1..j] 子字符串所 构成的 lcs 长度
  let mut dp = vec![vec![0; n + 1]; m + 1];
  let (s1, s2) = (
    s1.chars().collect::<Vec<char>>(),
    s2.chars().collect::<Vec<char>>(),
  );

  // 起始于 1 而不是 0 是为了规避特殊处理 dp[0-1] 这种索引溢出的场景
  for i in 1..=m {
    for j in 1..=n {
      // 当迭代到的两字符相等时，那么可与 dp[i-1][j-1] 构成新的 lcs，故是 dp[i-1][j-1] + 1
      if s1[i - 1 /* offset */] == s2[j - 1 /* offset */] {
        dp[i][j] =
          dp[i - 1 /* not offset, just previous */][j - 1 /* not offset, just previous */] + 1;
      } else {
        // 当 i 和 j 对应索引字符不等时，那么可能存在三种情况，s1[i-1]（因为起始于1，故减1）是 lcs 的一部分，
        // 同理也可能是 s2[j-1]，另外还可能是都不是 lcs 的一部分
        // 以下省略了 dp[i-1][j-1] 的比较，因为它一定是不大于 dp[i-1][j] 或 dp[i][j-1] 的
        dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
      }
    }
  }

  dp[m][n]
}

#[test]
fn test_length_of_lcs() {
  vec![("abcde", "ace", 3), ("abc", "abc", 3), ("abc", "def", 0)]
    .into_iter()
    .for_each(|(s1, s2, expect)| {
      assert_eq!(length_of_lcs(s1, s2), expect);
    })
}

pub fn lcs(s1: &str, s2: &str) -> String {
  let (s1, s2) = (
    s1.chars().collect::<Vec<char>>(),
    s2.chars().collect::<Vec<char>>(),
  );
  let mut dp = vec![vec![0; s2.len() + 1]; s1.len() + 1];

  // 始于 1 是为了规避对 0 的处理
  for i in 1..=s1.len() {
    for j in 1..=s2.len() {
      if s1[i - 1] == s2[j - 1] {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = dp[i - 1][j - 1].max(dp[i - 1][j]).max(dp[i][j - 1]);
      }
    }
  }

  // i, j 索引同前文，潜在偏移了 +1 索引
  let (mut i, mut j) = (s1.len(), s2.len());
  let mut path = std::collections::VecDeque::new();

  // 索引始于 1，故 i, j > 0
  while i > 0 && j > 0 {
    if s1[i - 1 /* offset */] == s2[j - 1/* offset */] {
      path.push_front(s1[i - 1 /* offset */]);
      i -= 1;
      j -= 1;
    } else if dp[i - 1][j] > dp[i][j - 1] {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  path.into_iter().collect::<String>()
}

#[test]
fn test_lcs() {
  vec![
    ("abcde", "ace", "ace"),
    ("abc", "abc", "abc"),
    ("abc", "def", ""),
  ]
  .into_iter()
  .for_each(|(s1, s2, expect)| {
    assert_eq!(lcs(s1, s2), expect.to_string());
  })
}
