function createRandomNumber(max = 50) {
  return Math.round(Math.random() * max)
}

export function createRandomListCopy() {
  return new Array(createRandomNumber(50))
    .fill(null)
    .map(() => createRandomNumber())
}

export function comparator(a: number, b: number) {
  return a > b
}
