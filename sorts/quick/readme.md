<!-- TOC -->

- [What](#what)
- [How](#how)
  - [非就地排序](#%E9%9D%9E%E5%B0%B1%E5%9C%B0%E6%8E%92%E5%BA%8F)
- [Core](#core)
- [Implementation](#implementation)
  - [非就地快速排序](#%E9%9D%9E%E5%B0%B1%E5%9C%B0%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
  - [就地排序](#%E5%B0%B1%E5%9C%B0%E6%8E%92%E5%BA%8F)
    - [Hoare 分区方案](#hoare-%E5%88%86%E5%8C%BA%E6%96%B9%E6%A1%88)
- [Visualization](#visualization)
- [References](#references)

<!-- /TOC -->

## What

Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.

Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.

Quicksort is a comparison sort, meaning that it can sort items of any type for which a "less-than" relation (formally, a total order) is defined. Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved.

快速排序（又称分区交换排序）是一种高效的排序算法。如果存在一个良好的实现的话，快速排序可以比合并排序和堆排序快两到三倍。

快速排序是一种 **分治算法**。它通过选择一个数组中的中心元素并根据它们是否比基准中心元素大或小划分其他元素到两个子数组中。子数组然后可以进行递归快速排序。快速排序在由额外的少量内存执行排序的条件下可就地完成。

快速排序是一种比较排序，这意味着它可以对任何定义了小于关系的任意类型的关系进行排序。高效的快速排序实现是 **不稳定的**，这意味着不会保留相等项的相对顺序。

![quick sort](./img/animation.gif)

## How

### 非就地排序

1. 选取排序基准 `pivot` 变量；

1. 将剩下的项与 `pivot` 变量对比，大的项进入 `subLeft` 子列表，反之（含相等和小于，因无法保证相等项的顺序，故快排是不稳定的），进入 `subRight` 子列表；

1. 递归排序 `subLeft` 和 `subRight`，并在二者的结果之间加入 `pivot` 项；

1. 以列表长度小于 `2` 作为递归终止条件；

## Core

核心思想是通过分治实现排序，由基准项和两个子数组组成排序。随机（或按特定规则）选取一个基准项 `pivot`，将大于的剩余项和小于等于的剩余项分列两个子列表。递归子列表进行子列表排序，得到最终列表排序结果。

## Implementation

### 非就地快速排序

见 [非就地排序](#非就地排序)

### 就地排序

#### Hoare 分区方案

> [Details](https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme)

```
algorithm quicksort(A, lo, hi) is
    if lo < hi then
        p := partition(A, lo, hi)
        quicksort(A, lo, p)
        quicksort(A, p + 1, hi)

algorithm partition(A, lo, hi) is
    pivot := A[⌊(hi + lo) / 2⌋]
    i := lo - 1
    j := hi + 1
    loop forever
        do
            i := i + 1
        while A[i] < pivot
        do
            j := j - 1
        while A[j] > pivot
        if i ≥ j then
            return j
        swap A[i] with A[j]
```

## Visualization

[Algorithm visualizer - quick sort](https://algorithm-visualizer.org/divide-and-conquer/quicksort)

## References

- [Wiki - Quick sort](https://en.wikipedia.org/wiki/Quick_sort)
- [Algorithms 4th - quick sort](https://algs4.cs.princeton.edu/23quicksort/)
