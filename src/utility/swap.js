export const swap = (arr, swap1, swap2) => {
  // if both elements present => swap elements and return swapped array
  if (arr.includes(`${swap1} App`) && arr.includes(`${swap2} App`)) {
    const index1 = arr.indexOf(`${swap1} App`)
    const index2 = arr.indexOf(`${swap2} App`)
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  return arr
}
