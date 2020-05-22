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

export function lessThan<E>(a: E, b: E) {
  return a < b
}

export function greaterThan<E>(a: E, b: E) {
  return a > b
}

export function exchange<E, I extends number>(list: E[], a: I, b: I) {
  ;[list[a], list[b]] = [list[b], list[a]]
}
