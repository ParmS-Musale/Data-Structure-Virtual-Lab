// Get references to DOM elements
const inputForm = document.getElementById('input-form');
const arrayInput = document.getElementById('array-input');
const visualizationArea = document.getElementById('visualization-area');
const algorithmSelect = document.getElementById('algorithm-select');
const startAnimationBtn = document.getElementById('start-animation');
const resetAnimationBtn = document.getElementById('reset-animation');

// Event listeners
inputForm.addEventListener('submit', handleSubmit);
startAnimationBtn.addEventListener('click', startAnimation);
resetAnimationBtn.addEventListener('click', resetVisualization);

// Array to store the bars for visualization
let bars = [];

// Animation delay in milliseconds
const animationDelay = 500;

// Function to handle form submission
function handleSubmit(e) {
  e.preventDefault();
  const inputArray = arrayInput.value.split(',').map(Number);
  createVisualization(inputArray);
}

// Function to create the visualization
function createVisualization(arr) {
  visualizationArea.innerHTML = '';
  bars = [];

  const maxValue = Math.max(...arr);
  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement('div');
    bar.style.height = `${(arr[i] / maxValue) * 100}%`;
    bar.classList.add('bar');
    visualizationArea.appendChild(bar);
    bars.push(bar);
  }
}

// Function to start the animation
function startAnimation() {
  const algorithm = algorithmSelect.value;
  const inputArray = arrayInput.value.split(',').map(Number);

  let sortedArray;
  switch (algorithm) {
    case 'bubble-sort':
      sortedArray = animateBubbleSort(inputArray);
      break;
    case 'quick-sort':
      sortedArray = animateQuickSort(inputArray);
      break;
    case 'merge-sort':
      sortedArray = animateMergeSort(inputArray);
      break;
    default:
      break;
  }
}

// Function to reset the visualization
function resetVisualization() {
  arrayInput.value = '';
  createVisualization([]);
}

// Bubble Sort implementation with animation
function animateBubbleSort(arr) {
  return new Promise((resolve) => {
    (function animate(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            // Swap arr[j] and arr[j+1]
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

            // Update visualization
            updateVisualization(arr);

            // Delay for animation
            setTimeout(() => {
              requestAnimationFrame(() => animate(arr));
            }, animationDelay);

            return;
          }
        }
      }
      resolve(arr);
    })(arr.slice());
  });
}

// Quick Sort implementation with animation
function animateQuickSort(arr) {
  // Implement animation for Quick Sort
  return new Promise((resolve) => {
    (function animate(arr, low = 0, high = arr.length - 1) {
      if (low < high) {
        const partitionIndex = partition(arr, low, high);

        updateVisualization(arr);

        setTimeout(() => {
          requestAnimationFrame(() => animate(arr, low, partitionIndex - 1));
        }, animationDelay);

        setTimeout(() => {
          requestAnimationFrame(() => animate(arr, partitionIndex + 1, high));
        }, animationDelay);
      } else {
        resolve(arr);
      }
    })(arr.slice());
  });
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      updateVisualization(arr);

      setTimeout(() => {
        requestAnimationFrame(() => {});
      }, animationDelay);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}


// Merge Sort implementation with animation
// function animateMergeSort(arr) {
//   // Implement animation for Merge Sort
//   return new Promise((resolve) => {
//     (function animate(arr) {
//       if (arr.length <= 1) {
//         resolve(arr);
//         return;
//       }

//       const middle = Math.floor(arr.length / 2);
//       const left = arr.slice(0, middle);
//       const right = arr.slice(middle);

//       animateMergeSort(left).then((sortedLeft) => {
//         animateMergeSort(right).then((sortedRight) => {
//           const merged = merge(sortedLeft, sortedRight);
//           updateVisualization(merged);

//           setTimeout(() => {
//             requestAnimationFrame(() => animate(merged));
//           }, animationDelay);
//         });
//       });
//     })(arr.slice());
//   });
// }

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Function to update the visualization
function updateVisualization(arr) {
  const maxValue = Math.max(...arr);
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${(arr[i] / maxValue) * 100}%`;
  }
}
