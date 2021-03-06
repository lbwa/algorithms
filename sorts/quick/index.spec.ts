import { QuickSort, QuickSortInPlace } from './index'
import { quickSortNotInPlace, QuickSortNotInPlace } from './out-place'
import { createRandomArray, greaterThan, lessThan } from 'shared/utils'
import { isSorted } from '../shared/utils'
import { Quick3Ways } from './3-ways'

describe('Quick sort with in-place', () => {
  it('Should be sorted by QuickSort class', () => {
    const list = createRandomArray()
    new QuickSort(list, lessThan)
    expect(isSorted(list)).toBeTruthy()
  })

  it('Should be sorted by QuickSort class', () => {
    const list = createRandomArray()
    new QuickSort(list, greaterThan)
    expect(isSorted(list, (a: number, b: number) => a >= b)).toBeTruthy()
  })
})

describe('In-place QuickSort', () => {
  it('Should be sorted', () => {
    const list = createRandomArray()
    new QuickSortInPlace(list, lessThan)
    expect(isSorted(list)).toBeTruthy()
  })

  it('Should be sorted', () => {
    const list = createRandomArray()
    new QuickSortInPlace(list, greaterThan)
    expect(isSorted(list, (a: number, b: number) => a >= b)).toBeTruthy()
  })
})

describe('Quick sort with out-place', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomArray()
    after = quickSortNotInPlace(before, greaterThan)
  })

  it('Should result a same length', () => {
    expect(before.length).toBe(after.length)
  })

  it('Should sort a list with default comparator', () => {
    expect(
      after.every(
        (item, index) => index === after.length - 1 || item >= after[index + 1]
      )
    ).toBeTruthy()
  })

  it('Should sort a list with custom comparator', () => {
    const after = quickSortNotInPlace(before, (a: number, b: number) => a < b)
    expect(
      after.every(
        (item, index) => index === after.length - 1 || item >= after[index + 1]
      )
    )
  })
})

describe('QuickSortNotInPlace with out-place', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomArray()
    after = new QuickSortNotInPlace(before, greaterThan).partition(0).sort()
  })

  it('Should sort a list with default comparator', () => {
    expect(before.length).toBe(after.length)
    expect(
      after.every(
        (item, index) => index === after.length - 1 || item >= after[index + 1]
      )
    ).toBeTruthy()
  })

  it('Should sort a list with custom comparator', () => {
    const after = new QuickSortNotInPlace(
      before,
      (a: number, b: number) => a < b
    )
      .partition(0)
      .sort()

    expect(before.length).toBe(after.length)
    expect(
      after.every(
        (item, index) => index === after.length - 1 || item <= after[index + 1]
      )
    )
  })
})

describe('Quick sort with 3 ways', () => {
  it('Should be sorted', () => {
    const list = createRandomArray()
    new Quick3Ways(list, (a: number, b: number) => a - b)
    expect(isSorted(list)).toBeTruthy()
  })

  it('Should be sorted', () => {
    const list = createRandomArray()
    new Quick3Ways(list, (a: number, b: number) => b - a)
    expect(isSorted(list, (a: number, b: number) => a >= b)).toBeTruthy()
  })
})
