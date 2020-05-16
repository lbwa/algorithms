import { shellSort } from './index'
import { isSorted, createRandomListCopy, greaterThan } from '../shared/utils'

describe('Shell sort', () => {
  it('Should be sorted', () => {
    expect(
      isSorted(shellSort(createRandomListCopy(), greaterThan))
    ).toBeTruthy()
  })
})
