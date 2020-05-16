function createRandomNumber(min = 10, max = 60) {
  return Math.round(Math.random() * (max - min - 1) + min)
}

export function createRandomListCopy() {
  return new Array(createRandomNumber(50))
    .fill(null)
    .map(() => createRandomNumber())
}

export function comparator(a: number, b: number) {
  return a > b
}

export function greaterThan(a: number, b: number) {
  return a > b
}

export function lessThan(a: number, b: number) {
  return a < b
}

export function exchange<E>(list: E[], a: number, b: number) {
  const temp = list[a]
  list[a] = list[b]
  list[b] = temp
}

export function isSorted<E>(
  list: E[],
  comparator: Comparator<E> = (a, b) => a >= b
) {
  return list.every(
    (item, index) =>
      index === list.length - 1 || comparator(item, list[index + 1])
  )
}
