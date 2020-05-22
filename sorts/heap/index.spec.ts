import { HeapSort } from './index'
import { createRandomArray } from 'shared/utils'
import { isSorted } from 'sorts/shared/utils'

describe('Heap sort', () => {
  it('Should be sorted by HeapSort class', () => {
    const list: Heap<number> = ([null] as Heap<number>).concat(
      createRandomArray(10, 50)
    ) as Heap<number>
    new HeapSort(list)
    expect(
      isSorted(list.slice(1) as number[], (a: number, b: number) => a <= b)
    ).toBeTruthy()
  })
})
