function quickSort (arr) {
  if (arr.length < 2) return arr

  const lesser = []
  const greater = []

  // extract benchmark item from original array
  const benchmark = arr.splice(Math.floor(arr.length / 2), 1)[0]

  arr.forEach(item => {
    item <= benchmark ? greater.push(item) : lesser.push(item)
  })

  // recursive calling
  return quickSort(greater).concat(benchmark, quickSort(lesser))
}