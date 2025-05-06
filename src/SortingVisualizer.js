import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import {
  PlayCircleOutlineRounded as Play,
  SkipNextRounded as Forward,
  SkipPreviousRounded as Backward,
  RotateLeft,
  PauseCircleOutlineRounded as Pause,
  PlayArrowRounded as Resume,
} from '@mui/icons-material';
import Bar from './components/bar';
import './App.css';
import BubbleSort from './algorithms/BS';
import InsertionSort from './algorithms/insertion';
import QuickSort from './algorithms/quick';
import MergeSort from './algorithms/merge';

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.actionLogRef = createRef();
  }

  state = {
    array: [],
    arraySteps: [],
    colorSteps: [],
    colorKey: [],
    currentStep: 0,
    count: 10,
    delay: 400,
    algorithm: 'Bubble Sort',
    timeouts: [],
    sorted: false,
    actionLog: [],
    currentLine: 0,
    lineNumbers: [],
    isAuthenticated: false,
    isPaused: false,
    resumeIndex: 0,
  };

  ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Insertion Sort': InsertionSort,
    'Quick Sort': QuickSort,
    'Merge Sort': MergeSort,
  };

  ALGORITHM_LINES = {
    // Your ALGORITHM_LINES remain unchanged
    'Bubble Sort': [
      { text: "function BubbleSort(array) {", line: 1 },
      { text: "  for (let i = 0; i < array.length - 1; i++) {", line: 4 },
      { text: "    for (let j = 0; j < array.length - i - 1; j++) {", line: 5 },
      { text: "      if (array[j] > array[j + 1]) {", line: 10 },
      { text: "        [array[j], array[j + 1]] = [array[j + 1], array[j]];", line: 13 },
      { text: "      }", line: 14 },
      { text: "    }", line: 15 },
      { text: "  }", line: 16 },
      { text: "}", line: 17 },
    ],
    'Insertion Sort': [
      { text: "function InsertionSort(array) {", line: 1 },
      { text: "  for (let i = 1; i < array.length; i++) {", line: 3 },
      { text: "    let key = array[i];", line: 4 },
      { text: "    let j = i - 1;", line: 5 },
      { text: "    while (j >= 0 && array[j] > key) {", line: 6 },
      { text: "      array[j + 1] = array[j];", line: 7 },
      { text: "      j--;", line: 8 },
      { text: "    }", line: 9 },
      { text: "    array[j + 1] = key;", line: 10 },
      { text: "  }", line: 11 },
      { text: "}", line: 12 },
    ],
    'Quick Sort': [
      { text: "function QuickSort(array) {", line: 1 },
      { text: "  function quickSortHelper(start, end) {", line: 2 },
      { text: "    if (start >= end) return;", line: 3 },
      { text: "    let pivotIndex = partition(start, end);", line: 4 },
      { text: "    quickSortHelper(start, pivotIndex - 1);", line: 5 },
      { text: "    quickSortHelper(pivotIndex + 1, end);", line: 6 },
      { text: "  }", line: 7 },
      { text: "  function partition(start, end) {", line: 8 },
      { text: "    let pivot = array[end];", line: 9 },
      { text: "    let i = start - 1;", line: 10 },
      { text: "    for (let j = start; j < end; j++) {", line: 11 },
      { text: "      if (array[j] < pivot) {", line: 12 },
      { text: "        i++; swap(array[i], array[j]);", line: 13 },
      { text: "      }", line: 14 },
      { text: "    }", line: 15 },
      { text: "    swap(array[i + 1], array[end]);", line: 16 },
      { text: "    return i + 1;", line: 17 },
      { text: "  }", line: 18 },
      { text: "  quickSortHelper(0, array.length - 1);", line: 19 },
      { text: "}", line: 20 },
    ],
    'Merge Sort': [
      { text: "function MergeSort(array) {", line: 1 },
      { text: "  function mergeSortHelper(start, end) {", line: 2 },
      { text: "    if (start >= end) return;", line: 3 },
      { text: "    let mid = Math.floor((start + end) / 2);", line: 4 },
      { text: "    mergeSortHelper(start, mid);", line: 5 },
      { text: "    mergeSortHelper(mid + 1, end);", line: 6 },
      { text: "    merge(start, mid, end);", line: 7 },
      { text: "  }", line: 8 },
      { text: "  function merge(start, mid, end) {", line: 9 },
      { text: "    let left = array.slice(start, mid + 1);", line: 10 },
      { text: "    let right = array.slice(mid + 1, end + 1);", line: 11 },
      { text: "    merge sorted elements back", line: 12 },
      { text: "  }", line: 13 },
      { text: "  mergeSortHelper(0, array.length - 1);", line: 14 },
      { text: "}", line: 15 },
    ],
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  
componentDidUpdate(prevProps, prevState) {
  if (this.state.currentStep !== prevState.currentStep && this.actionLogRef.current) {
    this.actionLogRef.current.scrollTop = this.actionLogRef.current.scrollHeight;
  }
}

  handleAlgorithmChange = (e) => {
    this.setState({ algorithm: e.target.value }, this.generateRandomArray);
  };

  generateSteps = () => {
    let array = [...this.state.array];
    let steps = [];
    let colorSteps = [];
    let actionLog = [];
    let lineNumbers = [];

    this.ALGORITHMS[this.state.algorithm](array, steps, colorSteps, actionLog, (line) => lineNumbers.push(line));

    this.setState({
      arraySteps: steps,
      colorSteps,
      currentStep: 0,
      sorted: false,
      actionLog,
      lineNumbers,
      currentLine: 0,
    });
  };

  generateRandomArray = () => {
    const temp = Array.from({ length: this.state.count }, () => Math.floor(Math.random() * (200 - 50) + 50));
    const initialColorKey = new Array(this.state.count).fill(0);

    this.setState(
      {
        array: temp,
        arraySteps: [temp],
        colorKey: initialColorKey,
        currentStep: 0,
        sorted: false,
        actionLog: [],
        currentLine: 0,
        lineNumbers: [],
        isPaused: false,
        resumeIndex: 0,
      },
      this.generateSteps
    );
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach(clearTimeout);
    this.setState({ timeouts: [] });
  };

  pause = () => {
    this.clearTimeouts();
    this.setState({ isPaused: true, resumeIndex: this.state.currentStep });
  };

  resume = () => {
    this.setState({ isPaused: false }, () => this.start(this.state.resumeIndex));
  };

  start = (startIndex = this.state.currentStep) => {
    this.clearTimeouts();
    const { arraySteps, colorSteps, delay, lineNumbers } = this.state;
    let timeouts = [];

    for (let i = startIndex; i < arraySteps.length; i++) {
      const timeout = setTimeout(() => {
        if (this.state.isPaused) {
          this.clearTimeouts();
          this.setState({ resumeIndex: i });
          return;
        }

        this.setState({
          array: arraySteps[i],
          colorKey: colorSteps[i],
          currentStep: i + 1,
          currentLine: lineNumbers[i] || 0,
        });

        if (i === arraySteps.length - 1) {
          setTimeout(() => {
            this.setState({ colorKey: new Array(this.state.count).fill(2), sorted: true });
          }, delay);
        }
      }, delay * (i - startIndex));

      timeouts.push(timeout);
    }

    this.setState({ timeouts });
  };

  handleLogout = () => {
    localStorage.removeItem('loggedIn');
    this.props.history.push('/');
  };

  render() {
    const actionLogBoxClass = `action-log-box ${this.state.sorted ? 'sorted' : ''}`;
    const algorithmLines = this.ALGORITHM_LINES[this.state.algorithm] || [];

    return (
      <div
        style={{
          backgroundImage: `url('/visualizer-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <div className="App">
          <div className="main-layout" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className="algorithm-box" style={{ backgroundColor: 'black', color: 'white', padding: '1rem', borderRadius: '8px', marginRight: '1rem' }}>
              {algorithmLines.map(({ text, line }) => (
                <p key={line} style={{ color: this.state.currentLine === line ? 'red' : 'white', margin: 0 }}>
                  {text}
                </p>
              ))}
              <select
                value={this.state.algorithm}
                onChange={this.handleAlgorithmChange}
                style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '6px' }}
              >
                {Object.keys(this.ALGORITHMS).map((algo) => (
                  <option key={algo} value={algo}>
                    {algo}
                  </option>
                ))}
              </select>
            </div>

            <div className="frame">
              <div className="container card">
                {this.state.array.map((value, index) => (
                  <Bar
                    key={index}
                    index={index}
                    length={value}
                    color={this.state.colorKey[index]}
                    changeArray={this.changeArray}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="control-pannel">
            <div className="control-buttons">
              <button
                className="controller"
                disabled={this.state.currentStep <= 0}
                onClick={() =>
                  this.setState({
                    currentStep: this.state.currentStep - 1,
                    array: this.state.arraySteps[this.state.currentStep - 1],
                    colorKey: this.state.colorSteps[this.state.currentStep - 1],
                    currentLine: this.state.lineNumbers[this.state.currentStep - 1],
                  })
                }
              >
                <Backward />
              </button>
              {this.state.isPaused ? (
                <button className="controller" onClick={this.resume}>
                  <Resume />
                </button>
              ) : this.state.arraySteps.length === this.state.currentStep ? (
                <button className="controller" onClick={this.generateRandomArray}>
                  <RotateLeft />
                </button>
              ) : (
                <button className="controller" onClick={this.start}>
                  <Play />
                </button>
              )}
              <button className="controller" onClick={this.pause}>
                <Pause />
              </button>
              <button
                className="controller"
                disabled={this.state.currentStep >= this.state.arraySteps.length - 1}
                onClick={() =>
                  this.setState({
                    currentStep: this.state.currentStep + 1,
                    array: this.state.arraySteps[this.state.currentStep + 1],
                    colorKey: this.state.colorSteps[this.state.currentStep + 1],
                    currentLine: this.state.lineNumbers[this.state.currentStep + 1],
                  })
                }
              >
                <Forward />
              </button>
            </div>
            <button onClick={this.handleLogout} style={{ padding: '10px 20px', marginTop: '10px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>

          <div ref={this.actionLogRef} className={actionLogBoxClass}>
            {this.state.actionLog.slice(0, this.state.currentStep).map((log, index) => {
              const isComparing = log.startsWith('Comparing');
              const isSwapping = log.startsWith('Swapped');
              const isSorted = log.startsWith('Element') || log.startsWith('Array is fully sorted');
              const className = isSorted && this.state.sorted ? 'sorted-message' : '';
              const color = isComparing ? 'blue' : isSwapping ? 'red' : isSorted ? 'green' : 'black';
              return (
                <p key={index} style={{ color }} className={className}>
                  {log}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SortingVisualizer); 