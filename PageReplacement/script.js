const algorithm = document.getElementById('select-algorithm');
const numOfFrames = document.getElementById('num-of-frames');
const refString = document.getElementById('ref-string');
const separator = document.getElementById('separator');
let refStringArray = refString.value.split(separator.value);
let frames = parseInt(numOfFrames.value);

const visualPageFrames = document.getElementById('visual-page-frames');
const conclusion = document.getElementById('conclusion');

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
    }
    // Draw current page frame
    let pageFrame = "";
    for (let k = 0; k < frames; k++) {
      console.log(currentPageFrame[k]);
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
}

algorithm.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  frames = parseInt(numOfFrames.value);
  console.log(refStringArray, frames);
  visulize(refStringArray, frames, algorithm.value);
});

numOfFrames.addEventListener('change', () => {
  frames = parseInt(numOfFrames.value);
  console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});

refString.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});

separator.addEventListener('change', () => {
  refStringArray = refString.value.split(separator.value);
  console.log(refStringArray, frames);
  if (algorithm.value != 'none') {
    visulize(refStringArray, frames, algorithm.value);
  }
});
