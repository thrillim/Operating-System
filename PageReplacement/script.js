const algorithm = document.getElementById('select-algorithm');
const numOfFrames = document.getElementById('num-of-frames');
const refString = document.getElementById('ref-string');
const separator = document.getElementById('separator');
let refStringArray = refString.value.split(separator.value);
let frames = parseInt(numOfFrames.value);

const visualPageFrames = document.getElementById('visual-page-frames');
const conclusion = document.getElementById('conclusion');

const frameInfo = document.getElementById('frame-info');
const frameSubInfo = document.getElementById('frame-sub-info');

function visulize(refStringArray, frames, algorithm) {
  let pageFaults = 0;
  let isDrawn = false;
  // Initial frames
  let prevPageFrame = new Array(frames);
  for (let i = 0; i < frames; i++) {
    prevPageFrame[i] = ["-", "-"];
  }
  let currentPageFrame = new Array(frames);
  for (let i = 0; i < frames; i++) {
    currentPageFrame[i] = ["-", "-"];
  }
  // Page Frames
  visualPageFrames.innerHTML = "";
  for (let i = 0; i < refStringArray.length; i++) {
    // Calculate current page frame
    let isFull = (prevPageFrame.findIndex((item) => item[0] == "-") == -1);
    if (algorithm == 'FIFO') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], i];
        } else { // Page Frame is full
          // Find the first-in page frame
          let firstInFrameIndex = prevPageFrame.findIndex((item) => item[1] == Math.min(...prevPageFrame.map((item) => item[1])));
          prevPageFrame[firstInFrameIndex] = [refStringArray[i], i];
        }
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "first-in index";
    } else if (algorithm == 'LRU') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], i];
        } else { // Page Frame is full
          // Find the least-recently used page frame
          let leastRecentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[1] == Math.min(...prevPageFrame.map((item) => item[1])));
          prevPageFrame[leastRecentlyUsedFrameIndex] = [refStringArray[i], i];
        }
      } else { // Page Hit, found
        prevPageFrame[indexOfRef][1] = i;
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "least recent index";
    } else if (algorithm == 'MRU') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], i];
        } else { // Page Frame is full
          // Find the most-recently used page frame
          let mostRecentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[1] == Math.max(...prevPageFrame.map((item) => item[1])));
          prevPageFrame[mostRecentlyUsedFrameIndex] = [refStringArray[i], i];
        }
      } else { // Page Hit, found
        prevPageFrame[indexOfRef][1] = i;
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "least recent index";
    } else if (algorithm == 'LFU') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], [1, i]]; // [frequency, first-in index]
        } else { // Page Frame is full
          // Find the least-frequently used page frame (if there are more than one, choose the first-in one)
          let leastFrequentlyUsedFrameIndex;
          // Find the least-frequently used page frames
          let leastFrequentlyUsedFrames = prevPageFrame.filter((item) => item[1][0] == Math.min(...prevPageFrame.map((item) => item[1][0])));
          // If there is only one least-frequently used page frame, choose it
          if (leastFrequentlyUsedFrames.length == 1) {
            leastFrequentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[0] == leastFrequentlyUsedFrames[0][0]);
          } else { // If there are more than one least-frequently used page frames, choose the first-in one
            leastFrequentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[1][1] == Math.min(...leastFrequentlyUsedFrames.map((item) => item[1][1])));
          }
          prevPageFrame[leastFrequentlyUsedFrameIndex] = [refStringArray[i], [1, i]];
        }
      } else { // Page Hit, found
        prevPageFrame[indexOfRef][1][0]++;
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "frequency, first-in index";
    } else if (algorithm == 'MFU') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], [1, i]]; // [frequency, first-in index]
        } else { // Page Frame is full
          // Find the most-frequently used page frame (if there are more than one, choose the first-in one)
          let mostFrequentlyUsedFrameIndex;
          // Find the most-frequently used page frames
          let mostFrequentlyUsedFrames = prevPageFrame.filter((item) => item[1][0] == Math.max(...prevPageFrame.map((item) => item[1][0])));
          // If there is only one most-frequently used page frame, choose it
          if (mostFrequentlyUsedFrames.length == 1) {
            mostFrequentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[0] == mostFrequentlyUsedFrames[0][0]);
          } else { // If there are more than one most-frequently used page frames, choose the first-in one
            mostFrequentlyUsedFrameIndex = prevPageFrame.findIndex((item) => item[1][1] == Math.min(...mostFrequentlyUsedFrames.map((item) => item[1][1])));
          }
          prevPageFrame[mostFrequentlyUsedFrameIndex] = [refStringArray[i], [1, i]];
        }
      } else { // Page Hit, found
        prevPageFrame[indexOfRef][1][0]++;
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "frequency, first-in index";
    } else if (algorithm == '2ND') {
      prevPageFrame = currentPageFrame;
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      let refPointer = 0;
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], [0, i]]; // refference bit, first-in index
        } else { // Page Frame is full
          // Find the oldest page frame as the first refPointer
          refPointer = prevPageFrame.findIndex((item) => item[1][1] == Math.min(...prevPageFrame.map((item) => item[1][1])));
          while (prevPageFrame[refPointer][1][0] == 1) { // If refference bit is 1 then change it to 0
            prevPageFrame[refPointer][1][0] = 0;
            refPointer = (refPointer + 1) % frames;
          }
          // If refference bit is 0 then replace it
          prevPageFrame[refPointer] = [refStringArray[i], [0, i]];
        }
      } else { // Page Hit, found
        // If refference bit is 0 then change it to 1
        if (prevPageFrame[indexOfRef][1][0] == 0) {
          prevPageFrame[indexOfRef][1][0] = 1;
        }
        // If refference bit is 1 then do nothing
      }
      currentPageFrame = prevPageFrame
      frameSubInfo.innerHTML = "reference bit, first-in index";
    } else if (algorithm == 'OPT') {
      // Change "&infin;" to "Infinity" to make it work
      prevPageFrame = currentPageFrame.map((item) => item[1][0] == "&infin;" ? [item[0], [Infinity, item[1][1]]] : item);
      let indexOfRef = prevPageFrame.findIndex((item) => item[0] == refStringArray[i]);
      if (indexOfRef == -1) { // Page Fault, not found
        pageFaults++;
        isDrawn = true;
        if (!isFull) { // Page Frame is not full
          prevPageFrame[prevPageFrame.findIndex((item) => item[0] == "-")] = [refStringArray[i], [0, i]]; // distance with next string refference item, first-in index AND distance will be updated later
        } else { // Page Frame is full
          // Find index of the page frames with the longest distance with next string refference item
          console.log(prevPageFrame);
          let longestDistanceFrames = prevPageFrame.filter((item) => item[1][0] == Math.max(...prevPageFrame.map((item) => item[1][0])));
          console.log(longestDistanceFrames);
          // If there is only one page frame with the longest distance with next string refference item, choose it
          if (longestDistanceFrames.length == 1) {
            prevPageFrame[prevPageFrame.findIndex((item) => item[0] == longestDistanceFrames[0][0])] = [refStringArray[i], [0, i]]; // distance will be updated later
          } else { // If there are more than one page frames with the longest distance with next string refference item, choose the first-in one
            indexOfRef = longestDistanceFrames.findIndex((item) => item[1][1] == Math.min(...longestDistanceFrames.map((item) => item[1][1])));
            prevPageFrame[indexOfRef] = [refStringArray[i], [0, i]]; // distance will be updated later
          }
        }
      } else { // Page Hit, found
        // isDrawn = true;
      }
      // Update distance with next string refference item
      for (let j = 0; j < prevPageFrame.length; j++) {
        if (prevPageFrame[j][0] != "-") {
          prevPageFrame[j][1][0] = (distanceRef(i + 1, prevPageFrame[j][0]) == Infinity) ? "&infin;" : distanceRef(i + 1, prevPageFrame[j][0]);
        }
      }
      currentPageFrame = prevPageFrame;
      frameSubInfo.innerHTML = "distance with next string refference item, first-in index";
    }
    // Draw current page frame
    let pageFrame = "";
    for (let k = 0; k < frames; k++) {
      // console.log(currentPageFrame[k]);
      let data = currentPageFrame[k][0];
      let subData = currentPageFrame[k][1];
      pageFrame += `<div class="border-solid border border-primary text-center">${data} <div class="text-xs text-info text-center">${subData}</div></div> `;
    }
    if (isDrawn) {
      visualPageFrames.innerHTML += `<div><div class="font-bold mb-1">${refStringArray[i]}</div><div class="block ml-[12px] min-w-[24px]">${pageFrame}</div></div> `;
      isDrawn = false;
    } else {
      visualPageFrames.innerHTML += `<div><div class="font-bold mb-1">${refStringArray[i]}</div><div class="block ml-[12px] min-w-[24px] opacity-0">${pageFrame}</div></div> `;
    }
  }
  // Show conclusion
  conclusion.innerHTML = `Page Faults: ${pageFaults}`;
  // Display frame info
  frameInfo.className = "border-solid border border-primary text-center max-w-fit m-auto px-2";
}

function distanceRef(reffItemIndex, thisFrameNumber) {
  let distance = 0;
  for (let i = reffItemIndex; i < refStringArray.length; i++) {
    if (refStringArray[i] == thisFrameNumber) {
      return distance;
    }
    distance++;
  }
  return Infinity;
}

// console.log(distanceRef(0, 0));

algorithm.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  frames = parseInt(numOfFrames.value);
  // console.log(refStringArray, frames);
  visulize(refStringArray, frames, algorithm.value);
});

numOfFrames.addEventListener('change', () => {
  frames = parseInt(numOfFrames.value);
  // console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});

refString.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  // console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});

separator.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  // console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});
