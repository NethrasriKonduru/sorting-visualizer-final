const BubbleSort = (array, arraySteps, colorSteps, actionLog, updateLine) => {
  let colorKey = array.map(() => 0);
  arraySteps.push([...array]);
  colorSteps.push([...colorKey]);
  actionLog.push("Initial Array");
  updateLine(1); // Line 1: Function declaration

  for (let i = 0; i < array.length - 1; i++) {
    updateLine(4); // Line 4: Outer loop start
    for (let j = 0; j < array.length - i - 1; j++) {
      updateLine(5); // Line 5: Inner loop start

      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      arraySteps.push([...array]);
      colorSteps.push([...colorKey]);
      actionLog.push(`Comparing ${array[j]} and ${array[j + 1]}`);
      updateLine(10); // Line 10: If condition

      if (array[j] > array[j + 1]) {
        updateLine(13); // Line 13: Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        arraySteps.push([...array]);
        colorSteps.push([...colorKey]);
        actionLog.push(`Swapped ${array[j + 1]} and ${array[j]}`);
      }

      colorKey[j] = 0;
      colorKey[j + 1] = 0;
      arraySteps.push([...array]);
      colorSteps.push([...colorKey]);
      updateLine(15); // Line 15: Reset color
    }
    colorKey[array.length - 1 - i] = 2;
    arraySteps.push([...array]);
    colorSteps.push([...colorKey]);
    actionLog.push(`Element ${array[array.length - 1 - i]} is sorted.`);
    updateLine(16); // Line 16: Mark sorted
  }

  colorKey[0] = 2;
  arraySteps.push([...array]);
  colorSteps.push([...colorKey]);
  actionLog.push(`Element ${array[0]} is sorted.`);
  updateLine(17); // Line 17: Final element sorted
};

export default BubbleSort;
