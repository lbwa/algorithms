use crate::bag::Bag;

/// https://algs4.cs.princeton.edu/41graph/
#[derive(Default)]
pub struct UndirectedGraph {
  /// 顶点个数
  pub vectors: usize,
  /// 边的总数
  pub edges: usize,
  /// 邻接表，存储顶点的所有相邻顶点。
  ///
  /// 为了便于内聚 graph 的关键实现，做出以下简化处理：
  /// 1. 直接使用顶点作为索引，对应的索引值为该顶点的 **所有** 相邻顶点构成的链表；
  /// 2. 用例中邻接链表较短，故直接使用穷举遍历法实现边的检测；
  adjacency_list: Vec<Bag<VectorData>>, // TODO：Bag 需要支持 iterator trait 才能支持在邻接表中直接通过迭代的方式找到目标邻接点
}

pub type VectorData = usize;

impl UndirectedGraph {
  pub fn new() -> Self {
    UndirectedGraph::default()
  }

  pub fn add_edge(&mut self, v: VectorData, w: VectorData) {
    // 因为是无向图，故将两个顶点互相加入到对方的链表中，保证每个链表中始终都维护了当下顶点的所有相邻顶点
    for &(a, b) in &[(v, w), (w, v)] {
      if self.adjacency_list.get(a).is_none() {
        self.adjacency_list.resize(a + 1, Bag::new());
        self.vectors += 1;
      }
      self.adjacency_list[a].add(b);
    }
    self.edges += 1;
  }
}

impl UndirectedGraph {
  pub fn degree(&self, v: VectorData) -> usize {
    if self.adjacency_list.get(v).is_some() {
      self.adjacency_list[v].len()
    } else {
      0
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_undirected_graph() {
    let mut graph = UndirectedGraph::new();
    for &(a, b) in &[(0, 1), (0, 2)] {
      graph.add_edge(a, b);
    }
    assert_eq!(graph.vectors, 3);
    assert_eq!(graph.edges, 2);

    for &(a, b) in &[(1, 2), (1, 3), (3, 4)] {
      graph.add_edge(a, b);
    }
    assert_eq!(graph.vectors, 5);
    assert_eq!(graph.edges, 5);

    graph.add_edge(0, 3);
    assert_eq!(graph.vectors, 5);
    assert_eq!(graph.edges, 6);

    graph.add_edge(7, 8);
    assert_eq!(graph.vectors, 7);
    assert_eq!(graph.edges, 7);

    for &(input, expect) in &[(0, 3), (1, 3), (2, 2), (3, 3), (4, 1), (7, 1), (8, 1)] {
      assert_eq!(graph.degree(input), expect)
    }
  }
}
