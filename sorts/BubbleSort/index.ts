// 每次排序之后，重置 iteration 标识，并执行新一轮的相邻元素比较
export default function bubbleSort (arr: any[]): any[] {
  let swapped = true
  while (swapped) {
    swapped = false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
        // Reset `iteration` tag when element of array swapping is occurred.
        swapped = true
      }
    }
  }

  return arr
}

// https://en.wikipedia.org/wiki/Bubble_sort
