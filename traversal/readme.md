# Binary tree traversal

以二叉树为例，常规树的遍历分为：

1. 深度优先搜索

1. 广度优先搜索

## Depth-first search of tree

以根节点的相对于子树的访问顺序可将树的深度遍历分为以下三种：

1. 前序遍历，根节点首先遍历

1. 中序遍历，根节点在左右子树顺序之间遍历

1. 后序遍历，根节点在递归遍历完左右子树后遍历

### pre-order

前序遍历 `NLR`，首先访问根节点，后递归访问左右子树。

```
栈 stack
结果 answer

如果根节点为 null，那么返回结果 answer

入栈根节点

while (栈不为空时) {
  出栈，并获取栈顶 current
  push 栈顶 current.val 到结果 answer 中，使其成为末项

  如果 current 存在右子树，那么入栈右子树

  如果 current 存在左子树，那么入栈左子树

  （以上出栈并 push 时，即为前序遍历顺序）
}

返回 answer
```

### in-order

中序遍历 `LNR`，首先递归访问左子树，后访问根节点，最后递归访问右子树。

```
栈 stack
结果 answer
当前节点 current 为根节点

while (当 current 不为 null 时 **或** 栈不为空时) {
  while(当 current 不为 null 时) {
    入栈 current 节点（第一次为根节点）
    设置 current 节点为左子树
    （即尽可能的入栈左子树）
  }

  出栈，得到节点 current
  push 此时的 current.val 到 answer 中
  设置 current 为右子树
  （因为已经尽可能的将所有左节点入栈（且第一次是入栈的根节点），那么此处赋值右节点，若
  右节点为空，那么将遍历左叶子节点的节点，若此节点出栈，并遍历至此时，将继续遍历其右子树）
}

返回 answer
```

### post-order

后序遍历 `LRN`，首先递归访问左子树，后访问右子树，最后访问根节点。

```
栈 stack
结果 answer

如果根节点为 null，那么返回结果 answer

入栈根节点

while (栈不为空时) {
  出栈，并获取栈顶 current
  unshift 栈顶 current.val 到结果 answer 中，使其成为首项

  如果 current 存在左子树，那么入栈左子树

  如果 current 存在右子树，那么入栈右子树

  （以上出栈并 unshift 时，即为前序遍历顺序）
}

返回 answer
```

## Traversal boilerplate

### 前后序遍历

```ts
function traversalBoilerplate(node: BinaryTreeNode | null) {
  const stack: TreeNode[] = []
  const answer: number[] = []

  if (node === null) {
    return answer
  }

  stack.push(node)

  while (stack.length > 0) {
    const current = stack.pop()

    // 前序遍历
    // 前序遍历定义为节点项先于左右子节点项遍历，那么首先 push 节点项，后续左右顺序
    // push 左右子节点项
    answer.push(current.value)

    // 左右子节点谁在前，就后入栈，以保持在 push 操作后保持在前
    if (current.right) {
      stack.push(current.right)
    }

    if (current.left) {
      stack.push(current.left)
    }

    // 后序遍历
    // 关键点在于，通过 unshift 操作将原有保持在首位的节点项后移，而右左子节点向前移
    // 最终实现出栈时为后序遍历顺序
    answer.unshift(current.value)

    // 左右子节点谁在前就谁先入栈，以保持在 unshift 操作后保持在前
    if (current.left) {
      stack.push(current.left)
    }

    if (current.right) {
      stack.push(current.right)
    }
  }

  return answer
}
```

## Breadth-first search of tree

广度优先搜索，即按层次遍历（`level-order traversal`），始终尽可能的先访问距离根节点更近的节点，而后不断深入层次遍历远端节点。

```
队列 queue
结果矩阵 answer

如果当前根节点为 null，直接返回空的 answer 矩阵

push 节点到队列中

while (队列 queue 不为空时) {
  预先 push 空数组至 answer 中作为当前层的结果数组

  固定 levelSize 为当前 queue 的长度
  （因为后续 for 循环中会不断加入新的节点到队列中）

  （与前中后序遍历的显著不同在于，层次遍历每次迭代 Sn 层的 n 个节点，而不是 1 个节点）
  for [0, levelSize)
    队列出队首项，作为当前遍历的节点 current
    answer[answer.length - 1] push 当前节点 current 的值

    如果当前节点存在 left 节点，那么 left 节点入队

    right 节点同理

  (当前 while 循环结束时，queue 剩余节点为下一层的所有节点)
}

返回结果矩阵 answer
```

## References

- [wiki - tree traversal](https://en.wikipedia.org/wiki/Tree_traversal)
