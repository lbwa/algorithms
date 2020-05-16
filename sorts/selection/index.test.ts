import { selectionSort } from './index'
import { createRandomListCopy, isSorted, greaterThan } from '../shared/utils'

describe('section sort', () => {
  it('Should passed', () => {
    expect(
      isSorted(
        selectionSort(createRandomListCopy(), greaterThan),
        (a: number, b: number) => a <= b
      )
    ).toBeTruthy()
  })
})
