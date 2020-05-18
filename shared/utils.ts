export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function lessThan(a: number, b: number) {
  return a < b
}

export function exchange<E>(list: E[], a: number, b: number) {
  ;[list[a], list[b]] = [list[b], list[a]]
}
