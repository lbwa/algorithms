/**
 * @description
 * @param list
 * @param comparator
 * @wiki https://en.wikipedia.org/wiki/Quicksort
 */
export function quickSort<I = number>(
  list: I[],
  comparator: (a: I, b: I) => boolean
): I[] {
  if (list.length < 2) return list

  const leftPart: I[] = []
  const rightPart: I[] = []

  const middleMark = list.splice(Math.floor(list.length / 2), 1)[0]

  for (const item of list) {
    if (comparator(item, middleMark)) {
      rightPart.push(item)
    } else {
      leftPart.push(item)
    }
  }
  return quickSort(leftPart, comparator).concat(
    middleMark,
    quickSort(rightPart, comparator)
  )
}

export function defaultComparator(a: number, b: number) {
  return a > b
}
