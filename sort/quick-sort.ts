function quickSort (arr: any[]): any[] {
  if (arr.length < 2) return arr

  const lesser = []
  const greater = []

  // extract benchmark item from original array
  const benchmark = arr.splice(Math.floor(arr.length / 2), 1)[0]

  // Comparison part
  arr.forEach(item => {
    item <= benchmark ? lesser.push(item) : greater.push(item)
  })

  // recursive calling
  return quickSort(lesser).concat(benchmark, quickSort(greater))
}

// https://en.wikipedia.org/wiki/Quicksort
