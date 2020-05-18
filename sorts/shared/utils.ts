export function isSorted<E>(
  list: E[],
  comparator: Comparator<E> = (a, b) => a <= b
) {
  return list.every(
    (item, index) =>
      index === list.length - 1 || comparator(item, list[index + 1])
  )
}
