<!-- TOC -->

- [What](#what)
- [How](#how)
- [Core](#core)
- [Implementation](#implementation)
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

1. 选取排序基准 `pivot` 变量；

1. 将剩下的项与 `pivot` 变量对比，大的项进入 `subLeft` 子列表，反之（含相等和小于，因无法保证相等项的顺序，故快排是不稳定的），进入 `subRight` 子列表；

1. 递归排序 `subLeft` 和 `subRight`，并在二者的结果之间加入 `pivot` 项；

1. 以列表长度小于 `2` 作为递归终止条件；

## Core

核心思想是通过分治实现排序，由基准项和两个子数组组成排序。随机（或按特定规则）选取一个基准项 `pivot`，将大于的剩余项和小于等于的剩余项分列两个子列表。递归子列表进行子列表排序，得到最终列表排序结果。

## Implementation

## Visualization

## References

- [Wiki - Quick sort](https://en.wikipedia.org/wiki/Quick_sort)
- [Algorithms 4th - quick sort](https://algs4.cs.princeton.edu/23quicksort/)
