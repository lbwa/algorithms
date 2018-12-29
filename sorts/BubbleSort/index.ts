// 每次排序之后，重置 iteration 标识，并执行新一轮的相邻元素比较
export default function bubbleSort (arr: any[]): any[] {
  let swapped = true
  while (swapped) {
    swapped = false
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        exchangeItem(arr, i, i + 1)
        // Reset `iteration` tag when element of array swapping is occurred.
        swapped = true
      }
    }
  }

  return arr
}

function exchangeItem (arr: any[], originIndex: number, targetIndex: number) {
  let temp = arr[originIndex]
  arr[originIndex] = arr[targetIndex]
  arr[targetIndex] = temp
}

// https://en.wikipedia.org/wiki/Bubble_sort
