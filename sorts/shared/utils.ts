export function createRandomListCopy() {
  return new Array(20).fill(null).map(() => Math.ceil(Math.random() * 20))
}

export function comparator(a: number, b: number) {
  return a > b
}
