use crate::bag::Bag;
use std::collections::HashMap;

type Vertex = usize;
/// [Directed graph](https://algs4.cs.princeton.edu/42digraph/)
#[derive(Default)]
pub struct Digraph {
  pub edges: usize,

  adjacency_list: HashMap<Vertex, Bag<Vertex>>,
}

impl Digraph {
  pub fn new() -> Self {
    Default::default()
  }

  pub fn add_edge(&mut self, v: Vertex, w: Vertex) {
    // 与无向图不同的是，仅有 v->w 需要加入到 v 的邻接表中，进而表示出 w 是 v 有效的邻接顶点
    if self.adjacency_list.get(&v).is_none() {
      self.adjacency_list.insert(v, Bag::new());
    }

    if let Some(adj) = self.adjacency_list.get_mut(&v) {
      adj.add(w);
    }

    self.edges += 1;
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn digraph() {
    let mut graph = Digraph::new();
    for &(a, b) in &[(0, 1), (0, 2)] {
      graph.add_edge(a, b);
    }
    assert_eq!(graph.edges, 2);

    for &(a, b) in &[(1, 2), (1, 3), (3, 4)] {
      graph.add_edge(a, b);
    }
    assert_eq!(graph.edges, 5);

    graph.add_edge(0, 3);
    assert_eq!(graph.edges, 6);

    graph.add_edge(7, 8);
    assert_eq!(graph.edges, 7);
  }
}
