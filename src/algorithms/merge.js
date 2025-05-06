function MergeSort(array, steps, colorSteps, actionLog, lineCallback) {
    const arr = [...array];
    const colorKey = new Array(arr.length).fill(0);
  
    function merge(start, mid, end) {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;
  
      while (i < left.length && j < right.length) {
        colorKey.fill(0);
        colorKey[k] = 1;
        lineCallback(12);
        steps.push([...arr]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Comparing ${left[i]} and ${right[j]}`);
  
        if (left[i] <= right[j]) {
          arr[k] = left[i++];
        } else {
          arr[k] = right[j++];
        }
  
        steps.push([...arr]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Inserted ${arr[k]} at index ${k}`);
        k++;
      }
  
      while (i < left.length) {
        arr[k] = left[i++];
        colorKey.fill(0);
        colorKey[k] = 2;
        steps.push([...arr]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Inserted ${arr[k]} from left`);
        k++;
      }
  
      while (j < right.length) {
        arr[k] = right[j++];
        colorKey.fill(0);
        colorKey[k] = 2;
        steps.push([...arr]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Inserted ${arr[k]} from right`);
        k++;
      }
    }
  
    function mergeSortHelper(start, end) {
      if (start >= end) return;
      const mid = Math.floor((start + end) / 2);
      lineCallback(4);
      mergeSortHelper(start, mid);
      mergeSortHelper(mid + 1, end);
      merge(start, mid, end);
    }
  
    mergeSortHelper(0, arr.length - 1);
  
    const finalColor = new Array(arr.length).fill(2);
    steps.push([...arr]);
    colorSteps.push(finalColor);
    actionLog.push("Array is sorted.");
    lineCallback(15);
  }
  
  export default MergeSort;
  