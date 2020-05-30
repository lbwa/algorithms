type Comparator<E> = (a: E, b: E) => boolean

type Comparable<E> = (a: E, b: E) => number

/**
 * 在以数组表示的二叉堆中，为了计算方便在第 0 位始终为 null 值
 * @see https://algs4.cs.princeton.edu/24pq/
 */
type Heap<E> = [null, ...E[]]
