<!-- TOC -->

- [What](#what)
- [How](#how)
- [Core](#core)
- [Implementation](#implementation)
  - [Pseudocode implementation](#pseudocode-implementation)
  - [Optimizing bubble sort](#optimizing-bubble-sort)
- [Complexity](#complexity)
- [Visualization](#visualization)
- [References](#references)

<!-- /TOC -->

## What

Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.

![bubble sort](./animation.gif)

An example of bubble sort. Starting from the beginning of the list, compare every adjacent pair, swap their position if they are not in the right order (the latter one is smaller than the former one). After each iteration, one less element (the last one) is needed to be compared until there are no more elements left to be compared.

冒泡排序又称下沉排序。属于 [比较排序](https://en.wikipedia.org/wiki/Comparison_sort) 的一种。

## How

1. 取数组第一项，比较相邻下一项；

1. 当与下一项的比较结果不满足 `comparator(a, b)` 为 `true` 的情况时，交换比较的两项。此为 `“冒泡”` 或 `“下沉”`；

1. 不断地 **比较相邻两项**；

1. 在比较至数组末尾时，完成第一步中所选项的冒泡（下沉）操作。**此时列表项的最后一项即为列表中的极值项**。

   > 若 `a > b` 且 `comparator(a, b)` 返回 `true`时，最后一项此刻即为列表中的最大项。

1. 从第一步开始重复，顺序迭代比较数组中的相邻两项。

   1. 当从首到尾的数组顺序迭代中，不存在项的交换时，那么表示当前数组中各个相邻两项均满足 `comparator` 函数比较，那么即完成了数组项的排序，退出顺序迭代，返回排序后的数组列表。

## Core

> 以升序排序（小 -> 大）为例。

始终通过 **顺序迭代相邻两项** 至数组 **结尾**，通过 **交换两项** 来实现始终 **下沉** 不符合 `comparator` 的比较项，一次完整的顺序迭代，应该 **始终有一个** 迭代期间的 **最大项交换到数组末尾**。不断重复迭代，直至一次顺序迭代中不再发生数组项的交换。

冒泡（下沉）排序的本质就是通过多次相邻两项比较，不断冒泡（下沉）极值项实现排序。

## Implementation

### Pseudocode implementation

In pseudocode the algorithm can be expressed as (0-based array):

```
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            /* if this pair is out of order */
            if A[i-1] > A[i] then
                /* swap them and remember something changed */
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
    until not swapped
end procedure

```

### Optimizing bubble sort

The bubble sort algorithm can be optimized by observing that the n-th pass finds the n-th largest element and puts it into its final place. So, the inner loop can avoid looking at the last n − 1 items when running for the n-th time:

```
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                swapped = true
            end if
        end for
        n := n - 1
    until not swapped
end procedure
```

More generally, it can happen that more than one element is placed in their final position on a single pass. In particular, after every pass, all elements after the last swap are sorted, and do not need to be checked again. This allows to skip over many elements, resulting in about a worst case 50% improvement in comparison count (though no improvement in swap counts), and adds very little complexity because the new code subsumes the "swapped" variable:

To accomplish this in pseudocode, the following can be written:

```
procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        newn := 0
        for i := 1 to n - 1 inclusive do
            if A[i - 1] > A[i] then
                swap(A[i - 1], A[i])
                newn := i
            end if
        end for
        n := newn
    until n ≤ 1
end procedure
```

## Complexity

| Name            | Best |    Average    |     Worst     | Memory | Stable |
| --------------- | :--: | :-----------: | :-----------: | :----: | :----: |
| **Bubble sort** |  n   | n<sup>2</sup> | n<sup>2</sup> |   1    |  Yes   |

## Visualization

[algorithm-visualizer - bubble sort](https://algorithm-visualizer.org/brute-force/bubble-sort)

## References

- [wiki bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)
- [github/trekhleb/javascript-algorithms - bubble sort](https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/bubble-sort)
- [github/TheAlgorithms/Javascript - bubble sort](https://github.com/TheAlgorithms/Javascript#bubble)
- [youtube - bubble sort](https://youtu.be/6Gv8vg0kcHc?list=PLLXdhg_r2hKA7DPDsunoDZ-Z769jWn4R8)
