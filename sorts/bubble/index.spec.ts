import { bubbleSort } from './index'
import { createRandomListCopy, comparator } from '../shared/utils'

describe('BubbleSort', () => {
  it('Should sort a list with default comparator', () => {
    const pending = createRandomListCopy()
    const result = bubbleSort(pending, comparator)
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
