/// - https://youtu.be/KLBCUx1is2c
/// - https://leetcode.cn/problems/longest-common-subsequence/solutions/696763/zui-chang-gong-gong-zi-xu-lie-by-leetcod-y7u0/
/// - https://leetcode.cn/problems/longest-common-subsequence/solutions/590896/1143-zui-chang-gong-gong-zi-xu-lie-dong-zde2v/
pub fn length_of_lcs(s1: &str, s2: &str) -> usize {
  let (m, n) = (s1.len(), s2.len());
  // dp[i][j] 表示 s1[1..i] 子字符串和 s2[1..j] 子字符串所 构成的 lcs 长度
  let mut dp = vec![vec![0; n + 1]; m + 1];

  // 起始于 1 而不是 0 是为了避免后续处理 0-1 这种索引
  for i in 1..=m {
    for j in 1..=n {
      // 当迭代到的两字符相等时，那么可与 dp[i-1][j-1] 构成新的 lcs，故是 dp[i-1][j-1] + 1
      if s1.chars().nth(i - 1) == s2.chars().nth(j - 1) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
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
