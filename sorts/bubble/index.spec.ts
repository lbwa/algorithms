import { bubbleSort, defaultComparator } from './index'
import { createRandomListCopy } from '../shared/utils'

describe('BubbleSort', () => {
  it('Should sort a list with default comparator', () => {
    const pending = createRandomListCopy()
    const result = bubbleSort(pending, defaultComparator)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item <= result[index + 1]
      )
    ).toBeTruthy()
  })

  it('Should sort a list with custom comparator', () => {
    const pending = createRandomListCopy()
    const result = bubbleSort(pending, (a: number, b: number) => a < b)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item >= result[index + 1]
      )
    )
  })
})
