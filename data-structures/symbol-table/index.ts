/**
 * 符号表 symbol table
 * 符号表是一种存储键值对的数据结构，支持两种操作：插入 put，即将一组新的键值对存入表
 * 中；查找 get，即根据给定给的键得到相应的值。符号表的主要作用在于将一个键和一个值联系
 * 起来。
 * @see https://algs4.cs.princeton.edu/31elementary/
 */
export abstract class SymbolTable<K, V> {
  /**
   * 当前符号符号表实例的键值对数量
   */
  abstract size: number

  /**
   * 当前符号表是否为空
   */
  abstract isEmpty: boolean

  /**
   * 将键值对存入符号表中，若已存在同名键名，则更新键值，若传入空键值，则删除该键值对
   */
  abstract put(key: K, value: V | null): void

  /**
   * 获取指定键名的键值，若不存在指定键值，那么返回 null 值
   */
  abstract get(key: K): V | null

  /**
   * 通过键名删除指定键值对
   */
  delete(key: K) {
    return this.put(key, null)
  }

  /**
   * 键名 key 在当前符号表实例中是否存在对应键值
   */
  contains(key: K) {
    return this.get(key) !== null
  }
}
