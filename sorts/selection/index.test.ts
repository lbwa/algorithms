import { selectionSort } from './index'
import { createRandomArray, greaterThan } from 'shared/utils'
import { isSorted } from '../shared/utils'

describe('section sort', () => {
  it('Should passed', () => {
    expect(
      isSorted(
        selectionSort(createRandomArray(), greaterThan),
        (a: number, b: number) => a <= b
      )
    ).toBeTruthy()
  })
})
