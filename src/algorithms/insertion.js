function InsertionSort(array, steps, colorSteps, actionLog, lineCallback) {
    const arr = [...array];
    const colorKey = new Array(arr.length).fill(0);
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      colorKey.fill(0);
      colorKey[i] = 1;
      lineCallback(4);
      steps.push([...arr]);
      colorSteps.push([...colorKey]);
      actionLog.push(`Picked key ${key} at index ${i}`);
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
  
        colorKey.fill(0);
        colorKey[j] = 1;
        colorKey[j + 1] = 2;
        steps.push([...arr]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Moved ${arr[j]} to index ${j + 1}`);
        lineCallback(7);
  
        j--;
      }
  
      arr[j + 1] = key;
  
      colorKey.fill(0);
      colorKey[j + 1] = 2;
      steps.push([...arr]);
      colorSteps.push([...colorKey]);
      actionLog.push(`Inserted ${key} at index ${j + 1}`);
      lineCallback(10);
    }
  
    const finalColor = new Array(arr.length).fill(2);
    steps.push([...arr]);
    colorSteps.push(finalColor);
    actionLog.push("Array is sorted.");
    lineCallback(12);
  }
  
  export default InsertionSort;
  