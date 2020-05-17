import { MergeSort, mergeSort, mergeSortBottomUp } from './index'
import { isSorted, createRandomListCopy, greaterThan } from 'sorts/shared/utils'

describe('Merge sort', () => {
  it('Should be sorted by MergeSort class', () => {
    const list = createRandomListCopy()
    new MergeSort(list, greaterThan) // 在 greaterThan 时交换，故结果为升序
    expect(isSorted(list)).toBeTruthy()
  })

  it('Should be sorted by mergeSort function', () => {
    expect(
      isSorted(mergeSort(createRandomListCopy(), greaterThan))
    ).toBeTruthy()
  })

  it('Should be sorted by mergeSortBottomUp function', () => {
    expect(
      isSorted(mergeSortBottomUp(createRandomListCopy(), greaterThan))
    ).toBeTruthy()
  })
})
