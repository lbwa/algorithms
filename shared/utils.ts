function createRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function createRandomArray(min = 10, max = 60) {
  return new Array(createRandomNumber(min, max))
    .fill(null)
    .map(() => createRandomNumber(min, max))
}

export function lessThan(a: number, b: number) {
  return a < b
}

export function greaterThan(a: number, b: number) {
  return a > b
}

export function exchange<E>(list: E[], a: number, b: number) {
  ;[list[a], list[b]] = [list[b], list[a]]
}
