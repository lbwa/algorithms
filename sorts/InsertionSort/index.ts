export default function insertionSort (unsortedList: any[]): any[] {
  for (let i = 1; i < unsortedList.length; i++) {
    // Sorted part scanning based on sort benchmark unsortedList[i]
    for (let j = 0; j < i; j++) {
      // unsortedList[j] is current active element
      // when active element greater than sort benchmark unsortedList[i]
      if (unsortedList[i] < unsortedList[j]) {
        // 1. insert active element
        unsortedList.splice(j, 0, unsortedList[i])
        // 2. delete original active element
        unsortedList.splice(i + 1, 1)
        // 3. Exit current for-loop when insertion activated
        break
      }
    }
  }
  return unsortedList
}

// https://en.wikipedia.org/wiki/Insertion_sort
