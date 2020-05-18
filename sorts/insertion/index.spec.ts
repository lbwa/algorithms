import { insertionSort } from './index'
import { createRandomArray, greaterThan } from 'shared/utils'
import { isSorted } from '../shared/utils'

describe('Insertion sort', () => {
  it('Should be sorted', () => {
    expect(isSorted(insertionSort(createRandomArray(), greaterThan)))
  })
})
