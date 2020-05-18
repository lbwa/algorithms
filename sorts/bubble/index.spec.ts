import { bubbleSort, optimizedBubbleSort } from './index'
import { createRandomArray, greaterThan } from 'shared/utils'

describe('BubbleSort', () => {
  it('Should sort a list with default comparator', () => {
    const pending = createRandomArray()
    const result = bubbleSort(pending, greaterThan)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item <= result[index + 1]
      )
    ).toBeTruthy()
  })

  it('Should sort a list with custom comparator', () => {
    const pending = createRandomArray()
    const result = bubbleSort(pending, (a: number, b: number) => a < b)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item >= result[index + 1]
      )
    )
  })
})

describe('Optimized BubbleSort', () => {
  it('Should sort a list with default comparator', () => {
    const pending = createRandomArray()
    const result = optimizedBubbleSort(pending, greaterThan)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item <= result[index + 1]
      )
    ).toBeTruthy()
  })

  it('Should sort a list with custom comparator', () => {
    const pending = createRandomArray()
    const result = optimizedBubbleSort(pending, (a: number, b: number) => a < b)
    expect(
      result.every(
        (item, index) =>
          index === result.length - 1 || item >= result[index + 1]
      )
    )
  })
})
