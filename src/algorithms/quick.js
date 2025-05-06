function QuickSort(array, steps, colorSteps, actionLog, lineCallback) {
    const colorKey = new Array(array.length).fill(0);
  
    function swap(arr, i, j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    function addStep(arr, colorArr, logMessage, line) {
      steps.push([...arr]);
      colorSteps.push([...colorArr]);
      actionLog.push(logMessage);
      lineCallback(line);
    }
  
    function partition(arr, start, end) {
      let pivot = arr[end];
      let i = start - 1;
  
      for (let j = start; j < end; j++) {
        colorKey.fill(0);
        colorKey[j] = 1;
        colorKey[end] = 1;
        addStep(arr, colorKey, `Comparing ${arr[j]} and pivot ${pivot}`, 12);
  
        if (arr[j] < pivot) {
          i++;
          swap(arr, i, j);
          colorKey[i] = 2;
          colorKey[j] = 2;
          addStep(arr, colorKey, `Swapped ${arr[i]} and ${arr[j]}`, 13);
        }
      }
  
      swap(arr, i + 1, end);
      colorKey.fill(0);
      colorKey[i + 1] = 2;
      colorKey[end] = 2;
      addStep(arr, colorKey, `Swapped pivot ${arr[i + 1]} with ${arr[end]}`, 16);
  
      return i + 1;
    }
  
    function quickSortHelper(arr, start, end) {
      if (start >= end) return;
  
      let pivotIndex = partition(arr, start, end);
      quickSortHelper(arr, start, pivotIndex - 1);
      quickSortHelper(arr, pivotIndex + 1, end);
    }
  
    const copiedArray = [...array];
    quickSortHelper(copiedArray, 0, copiedArray.length - 1);
  
    // At the end, mark all as sorted
    const finalColor = new Array(array.length).fill(2);
    steps.push([...copiedArray]);
    colorSteps.push(finalColor);
    actionLog.push("Array is fully sorted.");
    lineCallback(20); // final line
  }
  
  export default QuickSort;
  