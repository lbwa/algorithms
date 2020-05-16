import { insertionSort } from './index'
import { createRandomListCopy, greaterThan, isSorted } from '../shared/utils'

describe('Insertion sort', () => {
  it('Should be sorted', () => {
    expect(isSorted(insertionSort(createRandomListCopy(), greaterThan)))
  })
})
