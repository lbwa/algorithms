import { quickSort, QuickSort } from './index'
import { createRandomListCopy, comparator } from '../shared/utils'

describe('Quick sort', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomListCopy()
    after = quickSort(before, comparator)
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
    const after = quickSort(before, (a: number, b: number) => a < b)
    expect(
      after.every(
        (item, index) => index === after.length - 1 || item >= after[index + 1]
      )
    )
  })
})

describe('QuickSort class', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomListCopy()
    after = new QuickSort(before, comparator).partition(0).sort()
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
    const after = new QuickSort(before, (a: number, b: number) => a < b)
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
