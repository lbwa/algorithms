import { shellSort } from './index'
import { createRandomArray, greaterThan } from 'shared/utils'
import { isSorted } from '../shared/utils'

describe('Shell sort', () => {
  it('Should be sorted', () => {
    expect(isSorted(shellSort(createRandomArray(), greaterThan))).toBeTruthy()
  })
})
