import { quickSortNotInPlace, QuickSortNotInPlace } from './index'
import { createRandomListCopy, greaterThan } from '../shared/utils'

describe('Quick sort without in-place', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomListCopy()
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

describe('QuickSortNotInPlace without in-place', () => {
  let before: number[]
  let after: number[]

  beforeEach(() => {
    before = createRandomListCopy()
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
