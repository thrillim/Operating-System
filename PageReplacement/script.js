const algorithm = document.getElementById('select-algorithm');
const numOfFrames = document.getElementById('num-of-frames');
const refString = document.getElementById('ref-string');
const separator = document.getElementById('separator');
let refStringArray = refString.value.split(separator.value);
let frames = parseInt(numOfFrames.value);

const visualRefString = document.getElementById('visual-ref-string');
const visualPageFrames = document.getElementById('visual-page-frames');
const conclusion = document.getElementById('conclusion');

function visulize(refStringArray, frames, algorithm) {
  visualRefString.innerHTML = refStringArray.map((item) => `<div class="border-solid border border-secondary px-1">${item}</div>`).join(' ');
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
