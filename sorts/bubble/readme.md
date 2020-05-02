<!-- TOC -->

- [What](#what)
- [How](#how)
- [Core](#core)
- [Visualization](#visualization)
- [References](#references)

<!-- /TOC -->

## What

![bubble sort](./animation.gif)

冒泡排序又称下沉排序。属于 [比较排序](https://en.wikipedia.org/wiki/Comparison_sort) 的一种。

## How

1. 取数组第一项，通过顺序迭代数组项，比较相邻下一项；

1. 当与下一项的比较结果不满足 `comparator(a, b)` 为 `true` 的情况时，交换比较的两项。此为 `“冒泡”` 或 `“下沉”`。

1. 在比较至数组末尾时，完成第一步中所选项的冒泡（下沉）操作。**此时列表项的最后一项即为列表中的极值项**。若 `a > b` 且 `comparator(a, b)` 返回 `true`时，最后一项此刻即为列表中的最大项。

1. 从第一步开始重复，取数组第二项开始顺序迭代数组项。

   1. 直至完成列表项最后一项的冒泡操作，退出排序，返回排序后的结果。

## Core

> 以升序排序（小 -> 大）为例。

始终通过 **顺序迭代** 数组至数组 **结尾**，通过 **交换两项** 来实现始终 **下沉** 不符合 `comparator` 的比较项，一次完整的顺序迭代，应该 **始终有一个** 迭代期间的 **最大项交换到数组末尾**。

我们可以人为冒泡排序就是多次顺序迭代找出当次顺序迭代中的最大项，并下沉到末尾。

## Visualization

[algorithm-visualizer - bubble sort](https://algorithm-visualizer.org/brute-force/bubble-sort)

## References

- [wiki bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)
