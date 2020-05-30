import { BinarySearch } from './index'

describe('Binary search', () => {
  it('Should init a BinarySearch instance', () => {
    const search = new BinarySearch((a: number, b: number) => a - b)
    expect(search.get(12)).toBeNull()
    expect(search.size).toBe(0)
    expect(search.isEmpty).toBeTruthy()
  })

  it('Should add a new key-value', () => {
    const search = new BinarySearch((a: number, b: number) => a - b)
    search.put(12, 13)
    search.put(16, 17)
    expect(search.size).toBe(2)
    expect(search.isEmpty).toBeFalsy()
    expect(search.contains(12)).toBeTruthy()
    expect(search.get(12)).toBe(13)
    expect(search.contains(10)).toBeFalsy()
    expect(search.get(10)).toBeNull()
    expect(search.contains(16)).toBeTruthy()
    expect(search.get(16)).toBe(17)
    search.put(10, 11)
    expect(search.size).toBe(3)
    expect(search.contains(10)).toBeTruthy()
    expect(search.get(10)).toBe(11)
    expect(search.min).toBe(10) // based on key comparison, not value
    expect(search.max).toBe(16) // based on key comparison, not value
  })

  it('Should update a key-value', () => {
    const search = new BinarySearch((a: number, b: number) => a - b)
    search.put(15, 16)
    expect(search.get(15)).toBe(16)
    search.put(15, 17)
    expect(search.get(15)).toBe(17)
  })
})
