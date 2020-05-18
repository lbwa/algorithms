import { MergeSort, mergeSort, mergeSortBottomUp } from './index'
import { createRandomArray, greaterThan } from 'shared/utils'
import { isSorted } from 'sorts/shared/utils'

describe('Merge sort', () => {
  it('Should be sorted by MergeSort class', () => {
    const list = createRandomArray()
    new MergeSort(list, greaterThan) // 在 greaterThan 时交换，故结果为升序
    expect(isSorted(list)).toBeTruthy()
  })

  it('Should be sorted by mergeSort function', () => {
    expect(isSorted(mergeSort(createRandomArray(), greaterThan))).toBeTruthy()
  })

  it('Should be sorted by mergeSortBottomUp function', () => {
    expect(
      isSorted(mergeSortBottomUp(createRandomArray(), greaterThan))
    ).toBeTruthy()
  })
})
