export const swap = (arr, swap1, swap2) => {
  // if both elements present => swap elements and return swapped array
  // REQUIRED appendText parameter
  const appendText = 'App'
  if (
    arr.includes(`${swap1} ${appendText}`) &&
    arr.includes(`${swap2} ${appendText}`)
  ) {
    const index1 = arr.indexOf(`${swap1} ${appendText}`)
    const index2 = arr.indexOf(`${swap2} ${appendText}`)
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  return arr
}
