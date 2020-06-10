<h1 align="center">Algorithms</h1>

<p align="center">
  <a href="https://circleci.com/gh/lbwa/algorithms">
    <img alt="Circle CI" src="https://circleci.com/gh/lbwa/algorithms.svg?style=svg">
  </a>
</p>

Record usual algorithms implemented by `JavaScript(TypeScript)`.

<!-- TOC -->

- [Install dependencies](#install-dependencies)
- [Compiling](#compiling)
- [Unit test](#unit-test)
- [Big O notation](#big-o-notation)
  - [Syntax](#syntax)
  - [Basic rules](#basic-rules)
  - [Further readings](#further-readings)
- [Sorting algorithms](#sorting-algorithms)
- [Binary tree traversal](#binary-tree-traversal)
- [Further readings](#further-readings)

<!-- /TOC -->

## Install dependencies

```bash
# using yarn
yarn

# using npm
npm i
```

## Compiling

```bash
# using yarn
yarn ts

# using npm
npm run ts
```

## Unit test

```bash
# using yarn
yarn test

# using npm
npm t

# Specific test
npm t <TEST_DIRECTORY_NAME>
```

> NOTE: TypeScript compiling would be handled by internal tools.

## Big O notation

> In computer science, big O notation is used to classify algorithms according to how their running time or space requirements grow as the input size grows.

在计算机领域，大 `O` 符号用于表示算法运行时 `runtime` 所使用的时间或空间相对于输入是如何变化的。，如 `O(1)` 表示无论输入如何变化，其所需的时间始终是固定的；`O(n)` 表示算法所需的时间或空间是随着输入变化呈线性变化。在 [Wiki](https://en.wikipedia.org/wiki/Big_O_notation#Orders_of_common_functions) 可查询常见的复杂度。

### Syntax

Like `O(n)`. `n` is just a variable name and it could be replace by any character.

### Basic rules

1. Differences step get added

   ```ts
   function doSomething() {
     stepA() // O(a)
     stepB() // O(b)
   }
   ```

   `doSomething`'s complexity is `O(a + b)`.

1. Drop constants

   ```ts
   function minWithMax(array: number[]) {
     let min = null
     let max = null
     // O(n)
     for (const a of array) {
       min = Math.min(a, min)
     }
     // O(n)
     for (const b of array) {
       max = Math.max(b, max)
     }
   }
   ```

   `minWithMax`'s complexity is `O(n)`, instead of `O(2n)`.

   Always should drop any constants and use `O(n)` to replace `O(Xn)`(X represent a constant. eg. `O(2n)`).

1. Different inputs --> different variables

   ```ts
   function intersectionSize(arrayA: any[], arrayB: any[]) {
     let count: number = 0
     for (const a of arrayA) {
       for (const b of arrayB) {
         if (a === b) {
           ++count
         }
       }
     }
   }
   ```

   `intersectionSize`'s complexity is should be O(a \* b), a is the length of arrayA, same as b.

1. Drop non-dominate item

   ```ts
   function doThis(array: number[]) {
     let max = null

     // O(n)
     for (const num of array) {
       max = Math.max(num, max)
     }

     // O(n squared), n 的平方
     for (const a of array) {
       for (const b of array) {
         if (a === b) {
           console.log(a, b)
         }
       }
     }
   }
   // O(n) <= O(n + n squared) <= O(n squared + n squared)
   // result: O(n + n squared) ----> O(n squared), It also has dropped constants
   ```

   `doThis`'s complexity is `O(n squared)`.

### Further readings

- [wiki - Big O notation](https://en.wikipedia.org/wiki/Big_O_notation)
- [Youtube - Big O Notation](https://www.youtube.com/watch?v=v4cd1O4zkGw)

## Sorting algorithms

![sorting algorithms stability](./img/sort-characteristics.png)

## Binary tree traversal

- [See](traversal)

## Further readings

- [Algorithms 4th - sorting](https://algs4.cs.princeton.edu/20sorting/)
- [Algorithms 4th - searching](https://algs4.cs.princeton.edu/30searching/)
- [toptal.com - sorting algorithms](https://www.toptal.com/developers/sorting-algorithms)
- [algorithm-visualizer](https://algorithm-visualizer.org)
